const mongoose = require('mongoose');
const MongooseErrors = require('mongoose-errors');
mongoose.set('debug', true);

const expoSchema = mongoose.Schema({

    title: { type: String, required: true },
    date: { type: String, required: true },
    lieu: { type: String, required: true },
    content: { type: String, required: true },
    description: { type: String, required: true },
    image: { type:Array, required: true}

})

expoSchema.plugin(MongooseErrors);

module.exports = mongoose.model('expositions', expoSchema, "exposition");