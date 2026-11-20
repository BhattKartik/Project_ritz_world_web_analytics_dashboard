const mongoose = require("mongoose")


const dataSchema = new mongoose.Schema({

    views:{
        type:Number,
        required:true
    },
    sessions:{
        type:Number,
        required:true
    },
    visitors:{
        type:String,
        
    },
    devices:{
        type:Number
    },
    browsers:{
        type:String,
    },
    traffice_source:{
        type:String
    }
})


const Data = mongoose.model("Data",dataSchema,"data");

module.exports = Data