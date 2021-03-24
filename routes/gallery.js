const router = require('express').Router();
const {
    getAllPhotos,
    getPhoto,
    handlePhotoPost,
    deletePhoto
} = require('../modules/gallery');

router.get('/', getAllPhotos);
router.get('/:id', getPhoto);
router.post('/', handlePhotoPost);
router.delete('/:id', deletePhoto);

module.exports = router;