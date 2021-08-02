// IMPORTS AT THE TOP
const express = require('express') // import express from 'express' // ES6
const Dog = require('./dog-model')
// INSTANCE OF EXPRESS APP
const server = express()

// GLOBAL MIDDLEWARE
server.use(express.json()) // this teaches express to read JSON from reqs

// ENDPOINTS

// [GET] /api/dogs (R of CRUD, fetch all dogs)
server.get('/api/dogs', (req, res) => {
  Dog.findAll()
    .then(dogs => {
      res.status(200).json(dogs)
    })
    .catch(err => {
      res.status(500).json({ message: err.message })
    })
})
// [GET] /api/dogs/:id (R of CRUD, fetch dog by :id)
server.get('/api/dogs/:id', (req, res) => {
  // gather info from the req object
  const { id } = req.params
  // use that info to query the db using helper
  Dog.findById(id)
    .then(dog => {
      if (!dog) {
        res.status(404).json({ message: `dog ${id} not found`})
      }
    })
    .catch(err => {
      res.status(500).json({ message: err.message })
    })
})
// [POST] /api/dogs (C of CRUD, create new dog from JSON payload)
server.post('/api/dogs', (req, res) => {
  res.json({ message: 'post new dog working!' })
})
// [PUT] /api/dogs/:id (U of CRUD, update dog with :id using JSON payload)
server.put('/api/dogs/:id', (req, res) => {
  res.json({ message: 'update existing dog working!' })
})
// [DELETE] /api/dogs/:id (D of CRUD, remove dog with :id)
server.delete('/api/dogs/:id', (req, res) => {
  res.json({ message: `deleted dog with id ${req.params.id}` })
})
// EXPOSING THE SERVER TO OTHER MODULES
module.exports = server // export default server // ES6
