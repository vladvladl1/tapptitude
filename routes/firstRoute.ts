import { Router } from "express";
import userRouter from "./userRoute";

const firstRouter = Router();

firstRouter.get("/", async (req, res) => {
    res.send("all good");
});

export default firstRouter;