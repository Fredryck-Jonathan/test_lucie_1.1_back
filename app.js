const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASS}@${process.env.DB_CLUSTER}.mongodb.net/${process.env.DB_COLLECTION}?retryWrites=true&w=majority`,
    { useNewUrlParser: true,
    useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

    const corsOption = {origin:process.env.ORIGIN_CORS};

const app = express();

app.use(cors(corsOption));
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', corsOption.origin);
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    next();
});

const portfolioRoutes = require('./routes/portfolio');
const articlesRoutes = require('./routes/articles');
const userRoutes = require('./routes/user');
const bioPageRoutes = require('./routes/biographie_page');
const expoRoutes = require('./routes/exposition');

app.use('/portfolio', portfolioRoutes);
app.use('/articles', articlesRoutes);
app.use('/auth', userRoutes);
app.use('/biopage', bioPageRoutes);
app.use('/exposition', expoRoutes);

module.exports = app;