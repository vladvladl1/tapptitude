import {RideOp} from "../dbOperations/rideop";
import {ScooterOp} from "../dbOperations/scooterop";
import {UserOp} from "../dbOperations/userop";
import {Request} from "express";
import {IScooter} from "../models/scooterInterface";


const rideService = new RideOp();
const scooterService = new ScooterOp();
const userService = new UserOp();

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

export const suspend = async(req, res) => {
    const username = req.body.username;
    try{
        const user = userService.deleteByUsername(username);
        res.sendStatus(200);
    }catch(err){
        res.sendStatus(220);
        console.log(err);
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