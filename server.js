import mongoose from "mongoose";    
import cors from "cors"
import dotenv from "dotenv"
import express from 'express';
dotenv.config()

const app=express();

app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
    res.json({message:"Campus Platform API is running"});
})

const PORT=process.env.PORT||5000;

const startServer=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully")

        app.listen(PORT,()=>{
            console.log(`Server running on port ${PORT}`)
        })
    }catch(error){
        console.error("Mongodb connection error",error.message);
        process.exit(1);
    }
}
startServer();