const tf = require("@tensorflow/tfjs-node");
const path = require("path");

async function testModel() {
  try {
    const modelPath = path.resolve(__dirname, "model/model.json");

    console.log("TensorFlow version:", tf.version.tfjs);
    console.log("Loading model from:", modelPath);

    const model = await tf.loadLayersModel(`file://${modelPath}`);

    console.log("Model loaded successfully!");
    console.log("Input shape:", model.inputs[0].shape);
    console.log("Output shape:", model.outputs[0].shape);

    model.dispose();
  } catch (error) {
    console.error(error.stack);
  }
}

testModel();