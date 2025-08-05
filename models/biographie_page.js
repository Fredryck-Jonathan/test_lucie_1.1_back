const mongoose = require('mongoose');
const MongooseErrors = require('mongoose-errors');
mongoose.set('debug', true);

const biographiePageSchema = mongoose.Schema({

    title: { type: String, required: true },
    content: { type: Array, required: true },
})

biographiePageSchema.plugin(MongooseErrors);

module.exports = mongoose.model('biographie_page', biographiePageSchema, "biographie_page");