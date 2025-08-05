require('dotenv').config();
const bcrypt = require('bcrypt');
const User = require('../models/user');

const jwt = require('jsonwebtoken');

exports.login = (req, res, next) => {
    User.findOne({ username: req.body.username })
        .then(user => {
            if (!user) {
                return res.status(401).json({ type: 'error' ,error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ type:'error' ,error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        type: 'ok',
                        token: jwt.sign(
                            { userId: user._id },
                            process.env.TOKEN,
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({type:'error', error }));
        })
        .catch(error => res.status(500).json({type:'error', error }));
};