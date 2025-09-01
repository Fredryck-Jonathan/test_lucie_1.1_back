const Textes = require('../models/textes');

exports.getAllTextes = (req, res, next) => {
    Textes.find()
    .then((allTextes) => {res.status(200).json(allTextes); console.log(allTextes)})
    .catch((error) => res.status(400).json({error: error}));
};


exports.getOneTexte = (req, res, next) => {
    Textes.findOne({ _id: req.params.id})
        .then((oneTexte) => { res.status(200).json(oneTexte);})
        .catch((error) => res.status(404).json({error: error}));
};

exports.createTexte = (req, res, next) => {
    const texteObject = {...req.body };
    delete texteObject._id;
    const texte = new Textes({
        ...texteObject,
    });

    texte.save()
    .then(() => { res.status(201).json({message: 'Texte enregistré !'})})
    .catch(error => { res.status(400).json( { error })})
};


exports.modifyTexte = (req, res, next) => {
    const texteObject = req.file ? {
        ...JSON.parse(req.body.portfolio),
        /*imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`*/
    } : { ...req.body };

    delete texteObject._userId;
    Textes.findOne({_id: req.params.id})
        .then((portfolio) => {
            /*if (portfolio.userId != req.auth.userId) {
                res.status(403).json({ message : 'unauthorized request.'});
            } else {*/
                Textes.updateOne({ _id: req.params.id}, { ...texteObject, _id: req.params.id})
                .then(() => res.status(200).json({message : 'Texte modifié!'}))
                .catch(error => res.status(401).json({ error }));
            /*}*/
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
    
};

exports.deleteTexte = (req, res, next) => {
    Textes.findOne({ _id: req.params.id })
        .then(OneTexte => {
            Textes.deleteOne({_id: req.params.id})
            .then(() => { res.status(200).json({message: 'Texte supprimé !'})})
            .catch(error => res.status(401).json({ error }));
        })
        .catch( error => {
            res.status(500).json({ error });
        });
}

