const express = require('express')
const bodyParser = require('body-parser')
const app = express();


const port = 3000;

//local imports
const connect = require('../api/db')
const employeeRoutes = require('./controllers/employee.controller')
const { errorHandler } = require('./middlewares')

/**middleware */

app.use(bodyParser.json());
app.use('/api/employees', employeeRoutes)
app.use(errorHandler)

app.listen(port, () => {
    connect();
    console.log('server listening to port: ', port);
})