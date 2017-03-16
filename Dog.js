var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var timePlugin = require('./index');
var DogSchema = new Schema({
    name: String
})

// use in single Schema
// DogSchema.plugin(timePlugin);

module.exports = mongoose.model('Dog', DogSchema);