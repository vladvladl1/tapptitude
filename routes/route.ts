import express, {Express, Router} from "express";
import userRouter from "./userRoute"
import authRouter from "./authRouter";
import firstRouter from "./firstRoute";
import authAdminRouter from "./authAdminRouter";

const appRoute:Express = express();
appRoute.use(express.json());
appRoute.use("/", firstRouter);
appRoute.use("/auth", authRouter);
appRoute.use("/user", userRouter);
appRoute.use("/admin", authAdminRouter);

export default appRoute;