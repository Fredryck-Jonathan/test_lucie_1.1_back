const multer = require('multer');
const path = require('path');

//Configuration du stockage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        console.log(file.fieldname)
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});



// Initialisation de Multer
const upload = multer({ storage: storage });

module.exports = upload;