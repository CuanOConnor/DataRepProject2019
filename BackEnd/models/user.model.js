const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// user schema with some defining properties
// adds username field
const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
},{
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;