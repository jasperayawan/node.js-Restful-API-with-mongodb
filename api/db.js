const { response } = require('express')
const mongoose = require('mongoose')

const connect = async() => {
    try{
        const response = await mongoose.connect('mongodb+srv://ejayawan22:w4AjVbZEoWGu3o2P@cluster0.ie79xrc.mongodb.net/employee_db?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log('successfully connected to mongodb')
    }
    catch(err){
        response.json(err);
    }
}

module.exports = connect;

//w4AjVbZEoWGu3o2P
//ejayawan22