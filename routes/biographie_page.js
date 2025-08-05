const express = require('express');
const router = express.Router();

const biographiePageController = require('../controllers/biographie_page');

router.get('/', biographiePageController.getAllContentsBiographiePage);
router.delete('/:id', biographiePageController.deleteContentBiographiePage);
router.post('/', biographiePageController.createContentBiographiePage);
router.put('/:id', biographiePageController.modifyContentBiographiePage)

module.exports = router;