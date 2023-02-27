const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();

// Set up multer middleware to handle file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// Route to handle file upload
app.post("/upload", upload.single("archive"), (req, res) => {
  console.log(`Received file ${req.file.originalname}`);
  res.send("File uploaded successfully");
});

// Start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
