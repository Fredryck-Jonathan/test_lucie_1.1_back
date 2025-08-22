const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer')

const imagesController = require('../controllers/images');

router.get('/', imagesController.getAllImages);

router.post('/', upload.single('image') ,imagesController.createImage);

router.delete('/:id', imagesController.deleteImage)

module.exports = router;