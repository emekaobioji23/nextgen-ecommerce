const multer = require("multer");
const sharp = require('sharp');
const path = require("path");
const catchAsync = require("../utils/catch-async");
const cloudUpload = require("../utils/cloudinary");
const ErrorObject = require("../utils/error");
const Econsole = require("../utils/Econsole-log")

const multerStorage = multer.diskStorage({});

const multerFilter = (req, file, cb) => {
    const myconsole = new Econsole("file-uploads.js", "multerFilter", "")
    myconsole.log("entry")
    myconsole.log("file.mimetype", file.mimetype)
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb(new Error("Please upload only an image file"), false);
    }
    myconsole.log("exits")
};

const image = multer({
    limits: { fileSize: 1024 * 1024 * 5 }, // 2 MB limit
    storage: multerStorage,
    fileFilter: multerFilter,
});
exports.uploadImages = image.array("images")

let uploadedFiles

exports.uploadFilesToCloudinaryAndReturnFileObjects = (req,res,next) => {
    const myconsole = new Econsole("file-uploads.js", "uploadFilesToCloudinaryAndReturnFileObjects", "")
    myconsole.log("entry")
    uploadedFiles = new Array(req.files.length);
    let resizedFilePath
    if (req.files) {
        req.files.forEach(async (imageFile, index) => {
            myconsole.log("imageFile.path", imageFile.path)
            resizedFilePath = `resized_${imageFile.originalname}`;
            sharp(imageFile.path).resize(200, 200).toFile(resizedFilePath, (err, info) => {
                if (err) {
                    myconsole.log(err);
                    return res.status(500).send('Error processing image');
                }
                req.files[index].path=resizedFilePath;
            });
            myconsole.log("ireq.files[index].path", req.files[index].path)
            imageFile = { url: req.files[index].path, id: req.params.id + "-" + index, };
            uploadedFiles[index] = await cloudUpload(imageFile);
        });
    }
    myconsole.log("exits")
    next()
}

exports.delayMiddleware=(req, res, next)=> {
    const myconsole = new Econsole("file-uploads.js", "delayMiddleware", "")
    myconsole.log("entry")
    setTimeout(next, 5000); // Delay of 2 seconds (2000 milliseconds)
    myconsole.log("exits")
}
exports.getUploadedFileURLs=(req, res, next)=> {
    const myconsole = new Econsole("file-uploads.js", "getUploadedFileURLs", "")
    myconsole.log("entry")
    if (uploadedFiles) {
        console.log("uploadedFiles",uploadedFiles)
        req.body.images=new Array(uploadedFiles.length)
        uploadedFiles.forEach(async (imageFile, index) => {
            req.body.images[index] = uploadedFiles[index].secure_url;
        });
    }
    myconsole.log("exits")
    next()
}