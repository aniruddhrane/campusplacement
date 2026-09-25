import bcrypt from "bcryptjs";
import User from "../models/user.model.js"
import jwt from "jsonwebtoken"
export const register=async(req,res)=>{
    try{
        const{name,email,password,role,department,year,cgpa}=req.body;
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"User alreay exists with this mail"})
        }
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)

        const newUser=new User({
            name,
            email,
            password:hashedPassword,
            role,
            department,
            year,
            cgpa
        })
        await newUser.save()

        res.status(201).json({
            message:"User registered successfully",
            user:{
                id:newUser._id,
                name:newUser.name,
                email:newUser.email,
                role:newUser.role
            }
        })
    }catch(error){
        console.error("Registration error",error.message)
        res.status(500).json({message:"Internal Server error"})
    }
}

export const login=async(req,res)=>{
    try{
        const {email,password}=req.body
        const user=await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"Invalid credentials"})
    
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials"})
        }
        const payload={
            user:{
                id:user._id,
                role:user.role
            }
        }
        const token=jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {expiresIn:'7d'}
        )
        res.json({
            message:"Logged in successfully",
            token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                role:user.role
            }
        })
    }catch(error){
        console.log("Login error",error.message)
        res.status(500).json({message:"Internal server error"});
    }
}

export const getMyProfile=async(req,res)=>{
    try{
        const user=await User.findById(req.user.id).select('-password');
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        res.json(user)
    }catch(error)
    {
        console.error("Profile error",error.message)
        res.status(500).json({message:"Internal server error"})
    }
}