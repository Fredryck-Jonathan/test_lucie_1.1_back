const mongoose = require('mongoose');
const MongooseErrors = require('mongoose-errors');
mongoose.set('debug', true);

const imagesSchema = mongoose.Schema({

    url: { type: String, require: true },
    alt: {type: String, require: false},

})

imagesSchema.plugin(MongooseErrors);

module.exports = mongoose.model('images', imagesSchema, "images");