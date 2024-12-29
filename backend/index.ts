import express, { Request, Response } from "express"
import dotenv from "dotenv"
import cors from "cors"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"

dotenv.config()
const app = express()
const port = process.env.PORT || 8000

app.use(cookieParser())
app.use(express.json())
app.use(cors());

// routes
import authRoute from "./routes/authRoute"
import productRoute from "./routes/productRoute"

app.use("/api", authRoute)
app.use("/api/products", productRoute)


app.get("/", (req: Request, res: Response) => {
     res.send("Wellcome to Invoice Generator")
})

mongoose.connect(process.env.MONGO_URI!)
     .then(() => console.log("MongoDB connected successfully"))
     .catch((error: any) => console.log("MongoDB connection error :", error))

app.listen(port, () => {
     console.log(`server is running on http://localhost:${port}/`)
})