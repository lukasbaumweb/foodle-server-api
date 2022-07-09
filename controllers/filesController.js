const Foodle = require("../models/Foodle");
const File = require("../models/File");
const { getSizeFile } = require("../utils/fileUpload");
const path = require("path");

const uploadImages = async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    next(new BadRequestError("id missing"));
    return;
  }

  const images = Array.isArray(req.files.files)
    ? req.files.files
    : [req.files.files];

  console.log(req.files.files);

  const payload = {};

  try {
    if (images) {
      const files = [];
      const timestamp = new Date().getTime();

      for (let i = 0; i < images.length; i++) {
        try {
          const element = images[i];

          const uniqueFileName = `${id}-${timestamp}-${element.name}`;
          const filePath = path.join(
            __dirname,
            "..",
            "public",
            "foodles",
            uniqueFileName
          );

          const file = new File({
            title: element.title,
            name: element.name,
            type: element.mimetype,
            path: element.path,
            storedName: uniqueFileName,
            size: getSizeFile(element.size, 2),
            storedAt: filePath,
            order: i,
          });

          element.mv(filePath);

          const savedFile = await file.save();

          files.push(savedFile);
        } catch (err) {
          console.error(err);
          next(err);
        }
      }
      payload["images"] = files;
    }

    Foodle.updateOne({ _id: id }, payload, (err, data) => {
      if (err) {
        next(err);
      } else {
        res.json({ data: data });
      }
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = { uploadImages };
