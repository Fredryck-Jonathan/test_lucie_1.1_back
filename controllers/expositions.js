const Expositions = require('../models/exposition');

exports.getAllExpositions = (req, res, next) => {
    Expositions.find()
        .then((allExpositions) => {
            res.status(200).json(allExpositions); console.log(allExpositions)
        })
    .catch((error) => res.status(400).json({error: error}));
};


exports.getOneExposition = (req, res, next) => {
    Expositions.findOne({ _id: req.params.id})
        .then((oneExposition) => { res.status(200).json(oneExposition);})
        .catch((error) => res.status(404).json({error: error}));
};


exports.createExposition = (req, res, next) => {
    console.log(req.body)
    const expositionObject = {...req.body };
    delete expositionObject._id;
    const exposition = new Expositions({
        ...expositionObject,
    });

    exposition.save()
    .then(() => { res.status(201).json({message: 'Exposition enregistré !'})})
    .catch(error => { res.status(400).json( { error })})
};


exports.modifyExposition = (req, res, next) => {
    const expositionObject = req.file ? {
        ...JSON.parse(req.body.exposition),
        /*imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`*/
    } : { ...req.body };

    delete expositionObject._userId;
    Expositions.findOne({_id: req.params.id})
        .then((exposition) => {
            /*if (portfolio.userId != req.auth.userId) {
                res.status(403).json({ message : 'unauthorized request.'});
            } else {*/
                Expositions.updateOne({ _id: req.params.id}, { ...expositionObject, _id: req.params.id})
                .then(() => res.status(200).json({message : 'Exposition modifié!'}))
                .catch(error => res.status(401).json({ error }));
            /*}*/
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
    
};

exports.deleteExposition = (req, res, next) => {
    Expositions.findOne({ _id: req.params.id })
        .then(OneExposition => {

            Expositions.deleteOne({ _id: req.params.id })
                .then(() => { res.status(200).json({ message: 'Exposition supprimé !' }) })
                .catch(error => res.status(401).json({ error }));

        })
        .catch(error => {
            res.status(500).json({ error });
        });
};
