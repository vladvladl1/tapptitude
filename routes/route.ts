import express, {Express, Router} from "express";
import userRouter from "./userRoute"
import authRouter from "./authRouter";
import firstRouter from "./firstRoute";
import authAdminRouter from "./authAdminRouter";
import rideRouter from "./rideRoute";
import scooterRouter from "./scooterRoute";
import adminRouter from "./adminRouter";


const appRoute:Express = express();
appRoute.use(express.json());
appRoute.use("/", firstRouter);
appRoute.use("/auth", authRouter);
appRoute.use("/user", userRouter);
appRoute.use("/authAdmin", authAdminRouter);
appRoute.use("/ride", rideRouter);
appRoute.use("/scooter", scooterRouter);
appRoute.use("/admin", adminRouter);

export default appRoute;