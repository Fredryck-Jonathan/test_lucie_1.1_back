const mongoose = require('mongoose');
const MongooseErrors = require('mongoose-errors');
mongoose.set('debug', true);

const portfolioSchema = mongoose.Schema({

    position: { type: Number, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true }

})

portfolioSchema.plugin(MongooseErrors);

module.exports = mongoose.model('portfolio', portfolioSchema, "portfolio");