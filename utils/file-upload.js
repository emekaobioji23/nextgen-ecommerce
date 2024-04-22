const multer = require("multer");
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
    uploadedFiles = new Array(req.files.length);
    if (req.files) {
        req.files.forEach(async (imageFile, index) => {
            imageFile = { url: req.files[index].path, id: req.params.id + "-" + index, };
            uploadedFiles[index] = await cloudUpload(imageFile);
        });
    }
    next()
}

exports.delayMiddleware=(req, res, next)=> {
    setTimeout(next, 5000); // Delay of 2 seconds (2000 milliseconds)
}
exports.getUploadedFileURLs=(req, res, next)=> {
    if (uploadedFiles) {
        console.log("uploadedFiles",uploadedFiles)
        req.body.images=new Array(uploadedFiles.length)
        uploadedFiles.forEach(async (imageFile, index) => {
            req.body.images[index] = uploadedFiles[index].secure_url;
        });
    }
    next()
}