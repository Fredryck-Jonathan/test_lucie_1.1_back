const mongoose = require('mongoose');
//const MongooseErrors = require('mongoose-errors')

const userSchema = mongoose.Schema({
    
    username: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    }
});

//userSchema.plugin(MongooseErrors);
module.exports = mongoose.model('User', userSchema, "users");