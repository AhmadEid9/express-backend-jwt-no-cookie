import jwt from "jsonwebtoken"
import logMessage from "../utils/logMessage.js";
const protecteRoute = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        
        if (!authHeader)
            return res.status(401).json({ message: "Unauthorized" })

        const token = authHeader.split(" ")[1]



        if (!token)
            return res.status(401).json({ message: "Invalid Token" })

    
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        logMessage("error", error)
        return res.status(401).json({ message: "Internal server error" })
    }
}

export default protecteRoute