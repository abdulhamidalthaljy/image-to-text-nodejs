const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const Tesseract = require("tesseract.js");

const app = express();

// Enable CORS for all origins
app.use(cors());

// Middleware for handling file uploads
app.use(fileUpload());

app.post("/api/extractText", async (req, res) => {
  try {
    if (!req.files || !req.files.image) {
      return res.status(400).send({ error: "No image file uploaded" });
    }

    const imageBuffer = req.files.image.data;
    const { data: { text } } = await Tesseract.recognize(imageBuffer, "deu");

    res.status(200).send({ text });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
