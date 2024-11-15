import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import logMessage from "./utils/logMessage.js";

import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
import protecteRoute from "./middleware/protecteRoute.js";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/user", protecteRoute, userRouter);

app.use((req, res, next) => {
    console.log(req.path, req.method, res.statusCode);
    next()
})

app.listen(process.env.PORT, () => {
    logMessage('info',`Server running on port ${process.env.PORT}`);
    connectToMongoDB()
});