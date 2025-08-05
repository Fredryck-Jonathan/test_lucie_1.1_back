const Articles = require('../models/articles');

exports.getAllArticles = (req, res, next) => {
    Articles.find()
    .then((allArticles) => {res.status(200).json(allArticles); console.log(allArticles)})
    .catch((error) => res.status(400).json({error: error}));
};


exports.getOneArticle = (req, res, next) => {
    Articles.findOne({ _id: req.params.id})
        .then((oneArticle) => { res.status(200).json(oneArticle);})
        .catch((error) => res.status(404).json({error: error}));
};

exports.createArticle = (req, res, next) => {
    const articleObject = {...req.body };
    delete articleObject._id;
    const article = new Articles({
        ...articleObject,
    });

    article.save()
    .then(() => { res.status(201).json({message: 'Article enregistré !'})})
    .catch(error => { res.status(400).json( { error })})
};


exports.modifyArticle = (req, res, next) => {
    const articleObject = req.file ? {
        ...JSON.parse(req.body.portfolio),
        /*imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`*/
    } : { ...req.body };

    delete articleObject._userId;
    Articles.findOne({_id: req.params.id})
        .then((portfolio) => {
            /*if (portfolio.userId != req.auth.userId) {
                res.status(403).json({ message : 'unauthorized request.'});
            } else {*/
                Articles.updateOne({ _id: req.params.id}, { ...articleObject, _id: req.params.id})
                .then(() => res.status(200).json({message : 'Article modifié!'}))
                .catch(error => res.status(401).json({ error }));
            /*}*/
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
    
};

exports.deleteArticle = (req, res, next) => {
    Articles.findOne({ _id: req.params.id })
        .then(OneArticle => {
            Articles.deleteOne({_id: req.params.id})
            .then(() => { res.status(200).json({message: 'Article supprimé !'})})
            .catch(error => res.status(401).json({ error }));
        })
        .catch( error => {
            res.status(500).json({ error });
        });
}

