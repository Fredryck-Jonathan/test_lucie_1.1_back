const express = require('express');
const router = express.Router();

const portfolioController = require('../controllers/portfolio');

router.get('/', portfolioController.getAllCardsPortfolio);
router.delete('/:id', portfolioController.deletePortfolio);
router.post('/', portfolioController.createPortfolio);
router.put('/:id', portfolioController.modifyPortfolio)

module.exports = router;