const express = require('express');
const mongoose = require('mongoose');
const path = require('path')
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
const textesRoutes = require('./routes/textes');
const userRoutes = require('./routes/user');
const bioPageRoutes = require('./routes/biographie_page');
const expoRoutes = require('./routes/exposition');
const imageRoutes = require('./routes/images');


app.use('/uploads', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
}, express.static(path.join(__dirname, 'uploads')));


app.get('/file/:filename'), (req, res) => {

    const filename = req.paramas.filename;
    try {
        res.sendFile(__dirname + '/uploads/' + filename)
    }
    

    catch (error) {
        
        res.send('Error:' + error)

    }

}

app.use('/portfolio', portfolioRoutes);
app.use('/texte', textesRoutes);
app.use('/auth', userRoutes);
app.use('/biopage', bioPageRoutes);
app.use('/exposition', expoRoutes);
app.use('/images', imageRoutes);


module.exports = app;