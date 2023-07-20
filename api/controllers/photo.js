const imageDownloader = require("image-downloader");
const path = require("path");
const multer = require("multer");
const fs = require("fs");

const photosMiddleWare = multer({ dest: "uploads" });

const uploadByLink = async (req, res) => {
  const dirPath = path.join(__dirname, "..", "/uploads/");

  const { link } = req.body;
  const name = "photo" + Date.now() + ".jpg";
  await imageDownloader.image({
    url: link,
    dest: dirPath + name,
  });

  res.json(name);
};

const upload = async (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const ext = originalname.split(".")[1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace("uploads\\", ""));
  }
  res.send(uploadedFiles);
};

module.exports = { uploadByLink, upload };
