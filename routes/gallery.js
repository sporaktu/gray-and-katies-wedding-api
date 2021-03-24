const router = require('express').Router();
const {
    getAllPhotos,
    addPhoto,
    deletePhoto
} = require('../modules/gallery');

router.get('/', getAllPhotos);
router.post('/', addPhoto);
router.delete('/:id', deletePhoto);

module.exports = router;