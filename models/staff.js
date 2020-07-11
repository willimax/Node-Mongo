const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const staffSchema = new Schema({
    nome: {
        type: String,
        require: true
    },
    sobrenome: {
        type: String,
        require: true
    },
    cargo: {
        type: String,
        require: true
    },
    setor: {
        type: String,
        require: true
    },
    salario: {
        type: Number,
        require: true
    }
}, { timestamps: true });

const Staff = mongoose.model('Staff', staffSchema);
module.exports = Staff;