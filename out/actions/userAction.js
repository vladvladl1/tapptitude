"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAction = void 0;
const users_1 = require("../models/users");
const userService_1 = require("../service/userService");
class UserAction {
    constructor() {
        this.login = (req, res) => {
            const { email, parola } = req.body;
            // const user = users.find((u) => u.email === email && u.parola === parola);
            us: userService_1.UserService;
            const user = new users_1.User("a", "a", "d", "d", 23231, "ds");
            if (!user)
                res.sendStatus(401);
            else {
                // const token = jwt.sign({ userId: user.id }, config.get("jwtsecret"));
                // res.json([token]);
            }
        };
    }
}
exports.UserAction = UserAction;
//# sourceMappingURL=userAction.js.map