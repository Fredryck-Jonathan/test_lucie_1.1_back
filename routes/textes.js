const express = require('express');
const router = express.Router();

const textesController = require('../controllers/textes');

router.get('/', textesController.getAllTextes);
router.get('/:id', textesController.getOneTexte);

router.delete('/:id', textesController.deleteTexte);

router.post('/', textesController.createTexte);

router.put('/:id', textesController.modifyTexte)



module.exports = router;