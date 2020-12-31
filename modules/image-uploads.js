const path = require('path');
const multer = require('multer');
const imageFilter = require('./helpers/imageFilter')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/public/images')
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}-${path.extname(file.originalname)}`)
    }
})
const upload = multer({
    dest: 'public/images',
    storage,
    fileFilter: imageFilter
}).single('party_member_picture')


async function handleImageUpload(req, res) {
    return new Promise((resolve, reject) => {
        let path = '';
        console.log(req.body);
        req.file = req.body.file;
        upload(req, res, err => {
            if (req.fileValidationError) {
                return res.send(req.fileValidationError);
            } else if (!req.file) {
                return res.send('Please select an image to upload');
            } else if (err instanceof multer.MulterError) {
                return res.send(err);
            } else if (err) {
                return res.send(err);
            }
            path = req.file.path;
        })
        console.log('path', path);
        resolve(path);
    })
};

module.exports = {
    handleImageUpload
}