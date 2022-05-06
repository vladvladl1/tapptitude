import {UserOp} from "../dbOperations/userop";
import {ResourceService} from "../Complementary/s3drivingLicense";

const userService = new UserOp();
const bcrypt = require("bcrypt");

export const getMe = async(req, res ) => {
    const username = req.username;
    console.log(req.username);
    try{
        const person= await userService.findByUsername(username);
        if(person!==undefined){
            res.status(200).send(person);
        }else{
            res.sendStatus(220);
        }
    }catch(err){
        console.log(err);
        res.sendStatus(220);
    }
}

export const forgotPassword = async (req, res) => {
    const email = req.email;
    res.status(200).send("a link to " + email + "has been sent, there you can change password");
}

export const changePassword = async (req, res) => {
    const username = req.username;
    const oldPass = req.body.oldPass;
    const newPass = req.body.newPass;
    console.log("usernmae" + username);
    console.log("old" + oldPass);
    console.log("new" + newPass);
    if(oldPass===newPass){
        res.status(220).send({error: "Old password can not be same as new password"});
    }
    try{

        const person = await userService.findByUsername(username);
        if( username===undefined || oldPass===undefined || newPass===undefined){
            res.status(220).send({error: "wrong data"});
        }
        if(person!==undefined){
            bcrypt.compare(oldPass, person.password, async (err, resp) => {
                if (err) {
                    console.log("err m");
                    res.status(220).send({error: "wrong passsword"});
                }
                if (resp) {
                    console.log("resp m");
                    const enc = await bcrypt.genSalt(10);
                    const pass = await bcrypt.hash(newPass, enc);
                    const uperson = await userService.updatePasswordByUsername(person.username, pass);
                    res.status(200).send(uperson);
                }
                res.status(220).send({error: "wrong password"});
            });
        }else{
            console.log("ajunge aici");
            res.status(220).send({error: "wrong data"});
        }
    }catch(err){
        console.log("aici la err");
        res.status(220).send({error: "wrong old password"});
        console.log(err);
    }
}

export const getdl = async (req, res) => {
    const person = await userService.findByUsername(req.username);
    const path = person.drivingLicense;
    const s3 = new ResourceService();
    const url =  s3.getFileUrl(path);

    if(url!==undefined){
        res.status(200).send(url);
    }else{
        res.sendStatus(220);
    }
}

export const savedl =  async (req, res) => {
    const username = req.username;

    const fil:Express.Multer.File = req.file;
    const s3 = new ResourceService();
    console.log(fil);
    console.log("iar asta e body:");
    console.log(username);
    try{

        if(fil === undefined) {
            console.log("fil ii nul");
            res.status(220).send(fil);
        }else{
            const puts3 = await s3.uploadFile(fil, username);

            const person = await userService.updateDlByUsername(username, puts3.path);

            //console.log(puts3.path);
            res.status(200).json(puts3);
        }

    }catch(err){
        console.log(err);
    }
}