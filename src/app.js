const express = require('express')
const app = express()
const noteModel = require('./model/note.model')
const cors= require('cors')
const path = require('path')
app.use(express.json())
app.use(cors())
app.use(express.static('./public')) // this worked
app.use(express.static('../public')) // this one didn't work why



console.log('path : ',__dirname)
app.post("/notes",async (req,res)=>{
    const {title,description} = req.body
   const note =  await noteModel.create({
        title,description
    })
    res.status(201).json({
        message : 'Note Created',
        note
    })
})

// Get Method
app.get("/notes",async (req,res)=>{
   const note = await noteModel.find()
   res.status(200).json({
    message : "fetched successfully",
    note
   })
})

// Delete Method
app.delete("/notes/:id",async (req,res)=>{
    const id = req.params.id
    
    await noteModel.findByIdAndDelete(id)
    res.status(200).json({
        message : "Note Deleted"
    })
})

// Patch Method
app.patch("/notes/:id",async(req,res)=>{
    const id = req.params.id
    const { title,description }  = req.body
    await noteModel.findByIdAndUpdate(id,{ title,description }, { new: true } )

    res.status(200).json({
        message : " Note updated successfully "
    })
})

// app.use("*name",(req,res)=>{
//     res.sendFile(path.join(__dirname,"..","/public/index.html"))
// })

module.exports = app