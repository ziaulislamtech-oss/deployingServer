const express = require("express")

const app = express()
const cors = require("cors")
app.use(cors())
const noteModel = require("./models/note.model")
app.use(express.json())

// App Method
app.post("/api/notes",async(req,res)=>{
    const {profileImg,name,description} = req.body  
    const note = await noteModel.create({
        profileImg,name,description
    })
    res.status(201).json({
        message : " Note Created Successfully",
        note
    })
})

// Fetched Method
app.get("/api/notes",async(req,res)=>{
    const note = await noteModel.find()
    res.status(200).json({
        message : "note Fetched successfully",
        note
    })
})

// Patch Method
app.patch("/api/notes/:id",async(req,res)=>{
    const id = req.params.id
   const {profileImg,name,description} = req.body
   const note = await noteModel.findById(id)
   await noteModel.findByIdAndUpdate(id,{profileImg,name,description})
   res.status(200).json({
    message : "note updated successfully",
    note
   })
  
})

// Deleted Method 
app.delete("/api/notes/:id",async(req,res)=>{
    const id = req.params.id
    const note = await noteModel.findById(id)
    await noteModel.findByIdAndDelete(id)
    res.status(200).json({
        message : "Note Delected Successfully",
        note
    })
})


module.exports = app