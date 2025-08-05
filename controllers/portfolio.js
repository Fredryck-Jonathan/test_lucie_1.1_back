const Portfolio = require('../models/portfolio');

exports.getAllCardsPortfolio = (req, res, next) => {
    Portfolio.find()
    .then((cardsPortfolio) => {res.status(200).json(cardsPortfolio); console.log(cardsPortfolio)})
    .catch((error) => res.status(400).json({error: error}));
};


exports.createPortfolio = (req, res, next) => {

    const portfolioObject = {...req.body };
    delete portfolioObject._id;
    const portfolio = new Portfolio({
        ...portfolioObject,
        /*userId: req.auth.userId,*/
        /*imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`*/
    });

    portfolio.save()
    .then(() => { res.status(201).json({message: 'Portfolio enregistré !' , _id: portfolio._id})})
    .catch(error => { res.status(400).json( { error })})
};


exports.modifyPortfolio = (req, res, next) => {
    const portfolioObject = req.file ? {
        ...JSON.parse(req.body.portfolio),
        /*imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`*/
    } : { ...req.body };

    delete portfolioObject._userId;
    Portfolio.findOne({_id: req.params.id})
        .then((portfolio) => {
            /*if (portfolio.userId != req.auth.userId) {
                res.status(403).json({ message : 'unauthorized request.'});
            } else {*/
                Portfolio.updateOne({ _id: req.params.id}, { ...portfolioObject, _id: req.params.id})
                .then(() => res.status(200).json({message : 'Portfolio modifié!'}))
                .catch(error => res.status(401).json({ error }));
            /*}*/
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};


exports.deletePortfolio = (req, res, next) => {

    Portfolio.findOne({ _id: req.params.id })
        .then(OnePortfolio => {

            Portfolio.deleteOne({ _id: req.params.id })
                .then(() => { res.status(200).json({ message: 'Portfolio supprimé !' }) })
                .catch(error => res.status(401).json({ error }));

        })
        .catch(error => {
            res.status(500).json({ error });
        });
};

