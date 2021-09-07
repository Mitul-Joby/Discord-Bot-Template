const mongoose = require('mongoose');
const prefixSchema = new mongoose.Schema({
    prefix  : { type: String },
    guildID : { type: String }
});

module.exports = mongoose.model('prefixes', prefixSchema);
