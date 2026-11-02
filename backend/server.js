const express = require("express");

const multer = require("multer");
const tf = require("@tensorflow/tfjs-node");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5002;

app.use(express.json());
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Please upload an image file."));
    }
  }
});
let model;
let labels = [];

async function loadModel() {
  const modelPath = path.resolve(__dirname, "model/model.json");

  model = await tf.loadLayersModel(`file://${modelPath}`);

  const metadataPath = path.resolve(__dirname, "model/metadata.json");
  const metadata = require(metadataPath);

  labels = metadata.labels;

  console.log("Crop disease model loaded successfully!");
  console.log("Number of classes:", labels.length);
}
// Health-check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Crop Disease Prediction API is running",
    status: "healthy"
  });
});
app.post("/api/predict", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Please upload a leaf image using the 'image' field."
    });
  }

  if (!model) {
    return res.status(503).json({
      success: false,
      message: "The prediction model is not ready."
    });
  }

  let imageTensor;
  let resizedImage;
  let input;
  let predictions;

  try {
    imageTensor = tf.node.decodeImage(req.file.buffer, 3);

    resizedImage = tf.image.resizeBilinear(imageTensor, [224, 224]);

    input = resizedImage.toFloat().div(127.5).sub(1).expandDims(0);

    predictions = model.predict(input);

    const probabilities = await predictions.data();

    let bestIndex = 0;

    for (let i = 1; i < probabilities.length; i++) {
      if (probabilities[i] > probabilities[bestIndex]) {
        bestIndex = i;
      }
    }

    res.json({
      success: true,
      disease: labels[bestIndex],
      confidence: Number((probabilities[bestIndex] * 100).toFixed(2))
    });
  } catch (error) {
    console.error("Prediction error:", error.message);

    res.status(500).json({
      success: false,
      message: "Could not process the image."
    });
  } finally {
    if (imageTensor) imageTensor.dispose();
    if (resizedImage) resizedImage.dispose();
    if (input) input.dispose();
    if (predictions) predictions.dispose();
  }
});

loadModel()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Backend server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to load crop disease model:", error);
    process.exit(1);
  });