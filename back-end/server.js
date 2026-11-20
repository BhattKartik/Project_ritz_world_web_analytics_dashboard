// const mongoose = require("mongoose")
// const express = require("express")
// const cors = require("cors")
// const dataRoute = require("./routes/dataRoute")
// const app = express();

// const dbConnect = require("./config/db")
// dbConnect()

// app.use(cors());
// app.use(express.json());




// app.use("/api/data", dataRoute); //Route for data

// app.use


// app.get("/",(req,res)=>{

//     res.send(`Hello i am home page`)
// })


// app.listen(4000,()=>{

//     console.log(`Server Started at port 4000`);
    
// })




require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/dbConnection");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/analytics", require("./routes/analyticsRoutes"));

// Test route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Analytics Server is Running"
    });
});

// Server and database connection
const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {
        console.log("Server startup failed:", error.message);
        process.exit(1);
    }
};

startServer();
