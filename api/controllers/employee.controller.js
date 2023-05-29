const express = require('express')
const router = express.Router();
const Employee = require('../models/employee.model')
const { generateCrudMethods } = require('../services/index')
const employeeCrud = generateCrudMethods(Employee)
const { validateDbId, raiseRecord404Error } = require('../middlewares')

//get a request to POST the data to database

router.post('/', async (req,res) => {
    const {fullname, position, location, salary} = req.body;

    try{
        const response = await employeeCrud.create({
            fullname,
            position,
            location,
            salary
        })

        res.status(201).json(response);
    }
    catch(err){
        res.json(err)
    }

})

router.get('/', (req, res, next) => {
    employeeCrud.getAll()
    .then(data => res.send(data))
    .catch(err => next(err))
})

//get a request to GET or RETRIEVE the data to database

// router.get('/:id', (req, res) => {
//     Employee.findById(req.params.id)
//     .then(data => {
//         if(data){
//             res.send(data)
//         }else{
//             res.status(404).json({
//                 error: 'no record with given _id : ' + req.params.id
//             })
//         }
//     })
//     .catch(err => console.log(err))
// })

router.get('/:id', validateDbId, async(req, res, next) => {
 
        try{
            const userData = await employeeCrud.getById(req.params.id);
            if(userData){
                res.send(userData)
            }
            else{
                raiseRecord404Error(req, res)
            }
        }
        catch(err){
            next(err)
        }
    
})


router.put('/:id', validateDbId, async (req, res, next) => {
    try{
        const response = await employeeCrud.update(req.params.id, req.body)

        if(response){
            res.send(response)
        }
        else{
            raiseRecord404Error(req,res)
        }
    }
    catch(err){
        next(err)
    }
})


router.delete('/:id', validateDbId, async (req, res, next) => {
    try{
        const response = await employeeCrud.delete(req.params.id)

        if(response){
            res.send(response)
        }
        else{
            raiseRecord404Error(req,res)
        }
    }
    catch(err){
        next(err)
    }
})


module.exports = router;