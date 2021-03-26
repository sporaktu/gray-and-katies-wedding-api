const router = require('express').Router();
const {
    getAllRegistry,
    getRegistryItem,
    handleRegistryItemPost,
    handleDeleteRegistryItem,
    handleParseTrigger
} = require('../modules/registry');

router.get('/', getAllRegistry);
router.get('/:id', getRegistryItem);
router.post('/refresh', handleParseTrigger);
router.post('/', handleRegistryItemPost);
router.delete('/:id', handleDeleteRegistryItem);


module.exports = router;