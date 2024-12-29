import { Request, Response } from "express";
import bcryptjs from "bcryptjs"
import User from "../models/user";
import jwt from "jsonwebtoken"


export const register = async (req: Request, res: Response): Promise<void> => {
     try {
          const { name, email, password } = req.body;

          if (!name || !email || !password) {
               res.status(400).json("All fields are required!")
               return;
          }

          //checking user existance
          const existingUser = await User.findOne({ email })
          if (existingUser) {
               res.status(400).json({ success: false, message: "User already exist!" })
               return;
          }

          const hashedPassword = await bcryptjs.hash(password, 10);
          const newUser = await User.create({
               name,
               email,
               password: hashedPassword
          })
          await newUser.save()

          res.status(201).json({ success: true, message: "User registrated successfully" })

     } catch (error) {
          console.log("Internal server error while registering user :", error)
          res.status(500).json({ success: false, message: "Internal server error while registering user" })
     }
}

export const login = async (req: Request, res: Response): Promise<void> => {
     try {
          const { email, password } = req.body;

          const user = await User.findOne({ email })
          if (!user) {
               res.status(404).json({ success: false, message: "User does not exist!" })
               return;
          }

          const isPasswordMatch = await bcryptjs.compare(password, user.password)
          if (!isPasswordMatch) {
               res.status(400).json({ success: false, message: "Incorrect password!" })
               return;
          }

          // Generate a secure JWT token
          const token = jwt.sign(
               { id: user._id, email: user.email },
               process.env.JWT_SECRET!,
               { expiresIn: "1d" }
          );

          res
               .status(201)
               .json({ success: true, message: "User logged in successfully", data: user, token });

     } catch (error) {
          console.log("Internal server error while logging user :", error)
          res.status(500).json({ success: false, message: "Internal server error while logging user" })
     }
}