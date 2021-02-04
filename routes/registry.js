const router = require('express').Router();
const {
    getAllRegistry,
    getRegistryItem,
    handleRegistryItemPost,
    handleDeleteRegistryItem
} = require('../modules/registry');

router.get('/', getAllRegistry);
router.get('/:id', getRegistryItem);
router.post('/', handleRegistryItemPost);
router.delete('/:id', handleDeleteRegistryItem);


module.exports = router;