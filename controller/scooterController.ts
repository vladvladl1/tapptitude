import {Position} from "../dbOperations/allop";
import {ScooterOp} from "../dbOperations/scooterop";
import {Request} from "express";
import {IScooter} from "../models/scooterInterface";

const express = require('express');

const scooterService = new ScooterOp();


export const getByRadius = async (req, res) =>{
    const position: Position = req.body.position;
    const radius: number = req.body.radius;
    try{
    if(radius>10000){
        //throw error.invalidParameter("message");
        //res.status(422).send({error: "invalid input"});
    }
    if(position.coordinates[0]<0 && position.coordinates[0]<180){

    }

        const scooters = await scooterService.findNearby(radius, position);
        res.status(200).send(scooters);
    }catch(err){
        console.log(err);
        res.status(220).send({error:"error in search of scooter"});
        //return next(err);
    }

}

export const scooterDetail =  async (req, res) => {
    const scooterId = req.params.scooterId;
    console.log("scooter id este  " + scooterId);

    try{
        const scooter = await scooterService.findByScooterId(scooterId);
        res.status(200).send(scooter);
    }catch(err){
        console.log(err);
        res.status(220).send({error: "no scooter with that id"})
    }
}

export const lockScooter = async(req , res) => {
    const  pin = req.body.pin;
    const scooterId = req.params.scooterId;
    console.log("pin " + pin);
    console.log("params" + scooterId);
    try {
        const scooter = await scooterService.findByScooterId(scooterId);
        if(scooter.pin == pin) {
            const update = await scooterService.updateLockedByName(scooterId, "locked");
            return res.status(200).send({update});
        }else{
            res.status(220).send({error: "wrong pin"});
        }
    }catch(err){
        console.log(err);
        res.sendStatus(220);
    }
}

export const unlockScooter = async(req , res) => {
    const  pin  =   req.body.pin;
    const scooterId = req.params.scooterId;
    console.log("un para: " + pin);
    console.log("scooter id este  " + scooterId);
    try {
        const scooter = await scooterService.findByScooterId(scooterId);
        if(scooter.pin == pin) {
            const update = await scooterService.updateLockedByName(scooterId, "unlocked");
            return res.status(200).send({update});
        }else{
            res.status(220).send({error: "wrong pin"});
        }
    }catch(err){
        console.log(err);
        res.sendStatus(220);
    }
}


export const getAllScooters = async(req , res) => {
    try{
        const finded = await scooterService.findAll();
        res.status(200).send(finded);
    }catch (err){
        console.log(err);
        res.sendStatus(220);
    }
}

export const deleteScooters = async(req , res) => {
    try{
        const deleted = await scooterService.deleteAll();
        res.sendStatus(200);
    }catch (err){
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

export const pingScooter = async(req, res) => {
    const scooterId = req.params.scooterId;
    const userPos:Position = req.body;

    try{
        const scooter = await scooterService.findNearbyById(scooterId, userPos, 100);
        if(scooter===null){
            res.status(400).send({error:"scooter is too far"});

        }else{
            res.status(200).send({scooter});

        }
    }catch(err){
        console.log(err);
        res.status(400).send({error:"error pinging scooter"});
    }

}

