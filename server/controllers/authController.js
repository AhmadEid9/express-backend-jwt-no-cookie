import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

import User from "../models/usersModel.js"
import logMessage from "../utils/logMessage.js"

const signup = async (req, res) => {
    try{
        const { name, email, password } = req.body

        const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/

        if (!name || !email || !password)
            return res.status(400).json({ message: "Please provide all required fields" })

        const isEmailValid = emailRegex.test(email)

        if (!isEmailValid)
            return res.status(400).json({ message: "Invalid email format" })

        const salt = await bcrypt.genSalt(15)
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = new User({ name, email, password: hashedPassword })
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "3d" })
        await user.save()

        return res.status(201).json({ message: "User created successfully", token })
    } catch (error) {
        logMessage("error", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password)
            return res.status(400).json({ message: "Please provide all required fields" })

        const user = await User.findOne({ email })

        if (!user)
            return res.status(404).json({ message: "User not found" })

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid)    
            return res.status(401).json({ message: "Password Does not match" })

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "3d" })
    } catch (error) {
        logMessage("error", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

export { signup, login }