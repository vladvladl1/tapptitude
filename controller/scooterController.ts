import {Position} from "../dbOperations/allop";
import {ScooterOp} from "../dbOperations/scooterop";

const express = require('express');

const scooterService = new ScooterOp();


export const getByRadius = async (req, res) =>{
    const position: Position = req.body.position;
    const radius: number = req.body.radius;
    try{
        const scooters = await scooterService.findNearby(radius, position);
        res.status(200).send(scooters);
    }catch(err){
        console.log(err);
        res.status(220).send({error:"error in search of scooter"});
    }
}
