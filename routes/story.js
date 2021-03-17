const router = require('express').Router();
const {
    getStoryPart,
    getAllStoryParts,
    handleStoryPost,
    handleDeleteStory
} = require('../modules/story');

router.get('/', getAllStoryParts);
router.get('/:id', getStoryPart);
router.post('/', handleStoryPost);
router.delete('/:id', handleDeleteStory);

module.exports = router;