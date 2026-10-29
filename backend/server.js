const express = require("express");

const app = express();
const PORT = process.env.PORT || 5002;

app.use(express.json());

// Health-check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Crop Disease Prediction API is running",
    status: "healthy"
  });
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});