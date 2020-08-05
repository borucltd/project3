const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    // one-to-many embedded relation
    activities : [{
        title: {
            type: String
        },
        category: {
            type: String,
        },
        distance: {
            type: Number,
        },
        time: {
            type: Number,
        },
        date : {
            type: Date
        },
        file : {
            type: String
        },
        location : {
            type: {
              type: String,
              enum: ['Point']         
            },
            coordinates: {
              type: [Number]
            }
          }
    }]
});

// collections users
const User = mongoose.model('users', userSchema);
module.exports = User;