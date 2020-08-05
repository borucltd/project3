const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const secretSchema = new Schema({
  key: [{
    name: {
        type: String
    },
    value: {
        type: String
    }}]
});

// collections users
const Secret = mongoose.model('secrets', secretSchema);

module.exports = Secret;
