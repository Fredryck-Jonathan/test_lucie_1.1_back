const Images = require('../models/images');
const fs = require('fs');

exports.getAllImages = (req, res, next) => {
    Images.find()
    .then((allImages) => { res.status(200).json(allImages); console.log(allImages) })
    .catch((error) => res.status(400).json({ error: error }));

}


exports.createImage = (req, res, next) => {

    console.log("bonjour je suis entrain de créer une image");

    console.log(req.file.path, req.file, req.body, req.body.alt)

    const newImage = {
        url: req.file.path,
        alt: req.body.alt

    }

    const image = new Images({
        ...newImage,
    })

    image.save()
    .then(() => { res.status(201).json({status: 200 ,message: 'image enregistrer avec succés ! ', _id: image._id, fileName:req.file.path })})
    .catch(error => {res.status(500).json({status: 500,error: error})})


}


exports.deleteImage = (req, res, next) => {


    Images.findOne({ _id: req.params.id })
    .then(OneImage => {
        console.log(OneImage)
        res.status(200).json({ file: OneImage.url })
        /*const filename = OneImage.url;
        const filepath = path.join(__dirname, "uploads", filename);

        fs.unlink(filepath, (err) => {

            if (err) {
                console.error('Erreur lors de la suppresion:', err);
                return res.status(500).json({ error: "impossible de supprimer le fichier" });
            }

        })*/
        
        Images.deleteOne({ _id: req.params.id })
            .then(() => { res.status(200).json({ message: 'Image supprimé avec succés !' }) })
            .catch(error => res.status(401).json({ error: error }));
        
        
        
    })
    .catch((error) => res.status(400).json({ error: error }));



}