const multer = require('multer');
const { type } = require('os');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(__dirname + "/../../public/upload"))
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + "-" + file.originalname);
    },
})

const types = [
    "image/jpg",
    "image/jpeg",
    "image/png",
    "image/gif",
]

const fileFilter = (req, file, callback) => {
    if (types.indexOf(file.mimetype) >= 0) // si inférieur à 0 (-1) type de fichier ne correspond pas au type
        callback(null, true);
    else 
        callback(new Error("Only image is allowed"));
}


  module.exports = multer({storage, fileFilter}) // storage, fileFilter = clés attendues par Multer 