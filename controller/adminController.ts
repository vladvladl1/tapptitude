import {RideOp} from "../dbOperations/rideop";
import {ScooterOp} from "../dbOperations/scooterop";
import {UserOp} from "../dbOperations/userop";
import {Request} from "express";
import {IScooter} from "../models/scooterInterface";
import {SessionOp} from "../dbOperations/sessionop";


const rideService = new RideOp();
const scooterService = new ScooterOp();
const userService = new UserOp();
const sessionService = new SessionOp();

export const rideInfo = async (req, res) => {
    const id = req.params.rideId;
    try{
        const ride = await rideService.findById(id);
        res.status(200).send(ride);
    }catch(err){
        res.status(220).send({error: "wrong data"});
        console.log(err);
    }
}

export const scooterInfo = async (req, res) => {
    const scooterId = req.params.scooterId;
    try{
        const scooter = await scooterService.findByScooterId(scooterId);
        if(scooter!==undefined){
            res.status(200).send(scooter);
        }
    }catch(err){
        res.status(220).send({error: "no scooter was find with that ID"});
        console.log(err);
    }
}

export const getByDate = async(req, res) => {
    try{
        const users = await userService.findBySortedDate();
        res.status(200).send(users);
    }catch(err){
        console.log(err);
        res.sendStatus(220);
    }
}


export const createScooter = async(req: Request<unknown, unknown, IScooter>, res) => {
    const {body} = req;
    try {
        const scooter = await scooterService.createObject(body);
        res.status(200).send(scooter);
    }catch(e){
        console.log(e);
        res.sendStatus(220);
    }
}

export const suspendUser = async (req, res) => {
    const username = req.params.username;
    try{
        const user = await userService.findByUsername(username);
        if(user!==null) {
            await userService.updateUserStatus(username, "suspended");
            const sess = await sessionService.findByUsername(username);
            const something = await sessionService.deleteByUsername(sess.username);
            res.sendStatus(200);
        }else{
            res.status(401).send({error:"no user found"});
        }
    }catch(err){
        res.sendStatus(401);
        console.log(err);
    }
}
export const unsuspendUser = async (req, res) => {
    const username = req.params.username;
    try{
        const user = await userService.findByUsername(username);
        if(user!==null) {
            await userService.updateUserStatus(username, "active");
            res.sendStatus(200);
        }else{
            res.status(400).send({error:"no user found"});
        }
    }catch(err){
        res.sendStatus(400);
        console.log(err);
    }
}