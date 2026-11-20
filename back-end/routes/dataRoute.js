

const express = require("express")
const router = express.Router();

const Data = require("../model/dataModel")




router.get("/",async (req,res)=>{ //Show all data
    try {
        const data = await Data.find();
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get("/:id",async (req,res)=>{ //Show single data
    try {
        const data = await Data.findById(req.params.id);
        if(!data){
            return res.status(404).json({ message: "Data not found" })
        }
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router;