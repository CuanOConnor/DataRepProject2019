const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// exercise schema with some defining properties/objects
// adds exercise ands its fields
// self validating
const exerciseSchema = new Schema({
    username: { type: String, required: true},
    description: { type: String, required: true},
    duration: { type: Number, required: true},
    date: { type: Date, required: true},
}, {
    timestamps: true,
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;