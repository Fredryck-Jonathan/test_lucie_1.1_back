const express = require('express');
const router = express.Router();

const articlesController = require('../controllers/articles');

router.get('/', articlesController.getAllArticles);
router.get('/:id', articlesController.getOneArticle);

router.delete('/:id', articlesController.deleteArticle);

router.post('/', articlesController.createArticle);

router.put('/:id', articlesController.modifyArticle)



module.exports = router;