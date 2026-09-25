import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: function() {
            return this.role === "student" || this.role === "teacher";
        }
    },
    role: { // Added the missing role field
        type: String,
        enum: ['student', 'teacher', 'admin'],
        required: true
    },
    department: { // Moved your CS/IT/ENTC enum to a proper branch field
        type: String,
        enum: ['CS', 'IT', 'ENTC'],
        required: function() {
            return this.role === "student" || this.role === "teacher";
        }
    },
    year: {
        type: Number,
        min: 1, 
        max: 4,
        required: function() {
            return this.role === "student"; // Fixed typo
        }
    },
    cgpa: {
        type: Number,
        min: 0,
        max: 10,
        required: function() {
            return this.role === "student"; // Fixed typo
        }
    }
}, {
    timestamps: true // Correctly placed as the second argument
});

export default mongoose.model("User", userSchema);