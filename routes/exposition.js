const express = require('express');
const router = express.Router();

const expoController = require('../controllers/expositions');

router.get('/', expoController.getAllExpositions);
router.get('/:id', expoController.getOneExposition);

router.delete('/:id', expoController.deleteExposition);

router.post('/', expoController.createExposition);

router.put('/:id', expoController.modifyExposition)



module.exports = router;