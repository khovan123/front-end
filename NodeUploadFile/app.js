const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");
const cors = require("cors");

const filesPayloadExists = require("./middleware/filesPayloadExists.js");
const fileExtLimiter = require("./middleware/fileExtLimiter.js");
const fileSizeLimiter = require("./middleware/fileSizeLimiter.js");

const PORT = process.env.PORT || 3500;
const corsOptions = {
  origin: `http://localhost:${PORT}` || "http://localhost:3500",
};
const app = express();
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.post(
  "/upload",
  fileUpload({ createParentPath: true }),
  filesPayloadExists,
  fileExtLimiter([".png", ".jpg", ".jpeg"]),
  fileSizeLimiter,
  (req, res) => {
    const files = req.files;
    console.log(files);

    Object.keys(files).forEach((key) => {
      const filepath = path.join(__dirname, "files", files[key].name);
      files[key].mv(filepath, (err) => {
        if (err) return res.status(500).json({ status: "error", message: err });
      });
    });

    return res.json({
      status: "success",
      message: Object.keys(files).toString(),
    });
  }
);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
