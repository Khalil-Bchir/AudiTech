const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
    sectionID: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    type: {
        type: String,
        enum: ['FD','HD'], // FD as Finance departement, HD as Health departement
        required:true
    },
    description: {
        type: String,
        required: true,
    },
});

const Section = mongoose.model('Section', sectionSchema);

module.exports = Section;