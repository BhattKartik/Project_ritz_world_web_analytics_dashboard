const mongoose = require('mongoose');

const connectDB = async () => {

    try {
        await mongoose.connect("mongodb://localhost:27017/ritz_analytics")
        console.log(`Database Connected Sucessfull`);
        
    } catch (error) {

        console.log(`Database Connection Failed ${error.message}`)
        
    }

    
}

module.exports = connectDB