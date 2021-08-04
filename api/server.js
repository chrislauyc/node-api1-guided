// IMPORTS AT THE TOP

// INSTANCE OF EXPRESS APP

// GLOBAL MIDDLEWARE

// ENDPOINTS

// [GET] / (Hello World endpoint)
// [GET] /api/dogs/:id (R of CRUD, fetch dog by :id)
// [GET] /api/dogs (R of CRUD, fetch all dogs)
// [POST] /api/dogs (C of CRUD, create new dog from JSON payload)
// [PUT] /api/dogs/:id (U of CRUD, update dog with :id using JSON payload)
// [DELETE] /api/dogs/:id (D of CRUD, remove dog with :id)

// EXPOSING THE SERVER TO OTHER MODULES

// import the server and start it
const express = require("express");
const dogModel = require("./dog-model")
const server = express();
server.use(express.json());

server.get("/api/dogs",(req,res)=>{
    dogModel.findAll()
    .then((dogs)=>{
        console.log(dogs);
        res.status(200).json(dogs);
    })
    .catch(()=>{
        res.status(500).send("cannot obtain dogs");
    })
});
server.post("/api/dogs",(req,res)=>{
    const {name, weight} = req.body;
    if(name&&weight){
        dogModel.create(req.body)
        .then((newDog)=>{
            res.status(201).json(newDog);
        })
        .catch(()=>{
            res.status(500).json({message:"cannot create dog"});
        });
    }
    else{
        res.status(400).json({message:"dog must have name and weight"});
    }

});
server.get("/api/dogs/:id",(req,res)=>{
    dogModel.findById(req.params.id)
    .then((dog)=>{
        if(dog){
            res.status(200).json(dog);
        }
        else{
            res.status(404).send({message:"dog is not found"});
        }
    })
    .catch((err)=>{
        res.status(500).json({message:err.message});
    });
    

});
server.put("/api/dogs/:id",(req,res)=>{
    const {name, weight} = req.body;
    if(name&&weight){
        dogModel.update(req.params.id,req.body)
        .then((updatedDog)=>{
            if(updatedDog){
                res.status(200).json(updatedDog);
            }
            else{
                res.status(404).json({message:"dog is not found"});
            }
        })
        .catch((err)=>{
            res.status(500).json({message:err.message});
        })
    }
    else{
        res.status(400).json({message:err.message});
    }
});
server.delete("/api/dogs/:id",(req,res)=>{
    dogModel.delete(req.params.id)
    .then((delDog)=>{
        if(delDog){
            res.status(200).json(delDog);
        }
        else{
            res.status(404).json({message:"dog is not found"});
        }
    })
    .catch((err)=>{
        res.status(500).json({message:err.message});
    })
});
module.exports = server;
