import userModel from "../dataBase/userdb";
import {IUser} from "../models/userInterface";
import {Allop} from "./allop";



export class UserOp extends Allop<IUser> {
    constructor (){
        super(userModel);
    }
}





/*class A<T> {
    findAll():T[]{

        return [];
    }
}

class B extends A<string>{

}

let y:B = new  B();
y.findAll();*/







