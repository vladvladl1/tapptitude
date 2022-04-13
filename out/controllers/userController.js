"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const express_1 = require("express");
const users_1 = require("../models/users");
const jwt = require("jsonwebtoken");
//m-am razgandit si nu o sa folosesc clasa asta
class UserController {
    constructor() {
        this.login = (req, res) => {
            const { username, parola } = req.body;
            const user = new users_1.User("s", "s", "d");
            //acuma fac search-ul in baza de date folosindu-ma de username si aprola din body
            //user.findindatabse
            if (!user) {
                res.sendStatus(401);
            }
            else {
                const token = jwt.sign({ foo: username }, "aleluia");
                res.json([token]);
            }
        };
        this.register = (req, res) => {
            const { email, username, parola } = req.body;
            const user = new users_1.User("s", "s", "s");
            //adaug user-ul in baza de date si apoi transmit un response
            //mai intai verific daca exista un user cu acelasi email deja inregistrat
            //   if(user.findindatabase(email)){
            //      res.status(400).send({error: "already registered"})
            //   }
            //  else{
            //      res.sendStatus(200);
            const token = jwt.sign({ foo: username }, "aleluia");
            let x = (0, express_1.json)({ user, token });
            res.status(200).send(x);
            //  }
        };
    }
}
exports.UserController = UserController;
//# sourceMappingURL=userController.js.map