
const multer = require("multer");
const sharp = require('sharp');
const { UPLOAD_TIMEOUT } = process.env;
const catchAsync = require("../utils/catch-async");
const { cloudUpload } = require("../utils/cloudinary");
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
exports.uploadImagesToTempLocation = image.array("images")


exports.uploadImagesToCloudinary = async (req, res, next) => {
    const myconsole = new Econsole("file-uploads.js", "uploadImagesToCloudinary", "")
    /* try {
            myconsole.log("entry")
            req.body.images = []
            let resizedFilePath
            if (req.files) {
                req.files.forEach(async (imageFile, index) => {
                    try {
                        resizedFilePath = `${__dirname}/resized_images/resized_${imageFile.originalname}`;
                        await sharp(imageFile.path).resize({ width: 300 }).toFile(resizedFilePath);
                        imageFile = { url: resizedFilePath, id: req.params.id + "-" + index, };
                        req.body.images.push((await cloudUpload(imageFile)).secure_url);
                    } catch (error) {
                        myconsole.log(error);
                    }
                });
            }
        } catch (error) {
            myconsole.log(error);
        }
        req.cumTimeout="0" */
        /* await Promise.all(
            req.files.images.map(async (file, index) => {
              const filename = tour-${id}-${timeStamp}-${index + 1}.jpeg;
        
              await sharp(file.buffer)
                .resize(2000, 1333, {
                  fit: 'contain',
                })
                .toFormat('jpeg')
                .jpeg({ quality: 90 })
                .toFile(public/img/tours/${filename});
        
              req.body.images.push(filename);
            })
          ); */
    let resizedFilePath
    let imageFile2
    req.body.images =[]
    //myconsole.log("req.files=",req.files)
    //myconsole.log("req.file=",req.file)
    await Promise.all(
        req.files.map(async (imageFile, index) => {
            //myconsole.log("imageFile=",index,imageFile)
            resizedFilePath = `${__dirname}/resized_images/resized_${imageFile.originalname}`;
            //const filename = tour-${id}-${timeStamp}-${index + 1}.jpeg;
            await sharp(imageFile.path).resize({ width: 300 }).
                toFormat('jpeg').jpeg({ quality: 90 }).toFile(resizedFilePath);
            imageFile2 = { url: resizedFilePath, id: req.params.id + "-" + index, };
            req.body.images.push((await cloudUpload(imageFile2)).secure_url);
        })
    );
    myconsole.log("exits")
    next()
}
