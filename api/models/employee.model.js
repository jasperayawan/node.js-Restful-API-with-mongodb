const mongoose = require('mongoose')

module.exports =  mongoose.model('Employee', {
    fullname: {type: String},
    position: {type: String},
    location: {type: String},
    salary: {type: Number},
})