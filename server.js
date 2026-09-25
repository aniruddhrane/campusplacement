import mongoose from "mongoose";
import cors from "cors"
import dotenv from "dotenv"
import express from 'express';
dotenv.config()
import authRoutes from "./routes/auth.route.js"
const app = express();

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.json({ message: "Campus Platform API is running" });
})
app.use((req, res, next) => {
    console.log("INCOMING REQUEST:", req.method, req.originalUrl);
    next();
});
app.use("/api/auth", authRoutes)

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully")

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`)
        })
    } catch (error) {
        console.error("Mongodb connection error", error.message);
        process.exit(1);
    }
}
startServer();