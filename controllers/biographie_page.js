const BiographieModel = require('../models/biographie_page');

exports.getAllContentsBiographiePage = (req, res, next) => {
    BiographieModel.find()
    .then((contentsBiographiePage) => {res.status(200).json(contentsBiographiePage); console.log(contentsBiographiePage)})
    .catch((error) => res.status(400).json({error: error}));
};


exports.createContentBiographiePage = (req, res, next) => {
    const biographiePageObject = {...req.body };
    delete biographiePageObject._id;
    const biographieContentPage = new BiographieModel({
        ...biographiePageObject,
    });

    biographieContentPage.save()
    .then(() => { res.status(201).json({message: 'Nouveau contenu de la page biographie enregistré !'})})
    .catch(error => { res.status(400).json( { error })})
};


exports.modifyContentBiographiePage = (req, res, next) => {
    const biographiePageObject = req.file ? {
        ...JSON.parse(req.body.biographieContentPage),
    } : { ...req.body };

    delete biographiePageObject._userId;
    BiographieModel.findOne({_id: req.params.id})
        .then((biographieContent) => {

                BiographieModel.updateOne({ _id: req.params.id}, { ...biographiePageObject, _id: req.params.id})
                .then(() => res.status(200).json({message : 'Contenu biographie modifié!'}))
                .catch(error => res.status(401).json({ error }));

        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};


exports.deleteContentBiographiePage = (req, res, next) => {
    BiographieModel.findOne({ _id: req.params.id })
        .then(oneContentBiographiePage => {

            BiographieModel.deleteOne({_id: req.params.id})
            .then(() => { res.status(200).json({message: 'élément de la page biographie supprimé !'})})
            .catch(error => res.status(401).json({ error }));

        })
        .catch( error => {
            res.status(500).json({ error });
        });
}