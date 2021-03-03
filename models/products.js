const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchemaProdukti = new schema({
    imageUrl: String,
    ime: String,
    sadrzaj: String
})

module.exports = mongoose.model('Produkti', userSchemaProdukti, 'patike')