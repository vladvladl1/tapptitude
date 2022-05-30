import { Socket } from "net";
import {EventEmitter} from "events";
import {ScooterOp} from "../dbOperations/scooterop";
import {RideOp} from "../dbOperations/rideop";

const scooterService = new ScooterOp();
const rideService = new RideOp();
 export class TCPConnectionService{
     client = new Socket();
     internalId: number = 4352;
     private eventEmitter = new EventEmitter();
     constructor(){
         console.log("***")
         this.client.on('connect', ()=> console.log("I'm in"))
         this.client.on('close', () => console.log("I'm out"))
         this.client.on('error', (error) => console.error(error))
         this.client.on('data', (data) => this.handleData(data) )
         this.client.connect(5001,'ec2-18-156-36-228.eu-central-1.compute.amazonaws.com')

     }
     private async handleData(data: Buffer){
         const resp  = data.toString().split(",");

         const command = resp[3];
         let response: any;

         switch (command) {
             case "R0":
                 response = {operation: resp[4], key: resp[5], userId: resp[6], timestamp: resp[7]};

                  const lockUnlock =   resp[5] + "," + resp[6] ;

                 this.eventEmitter.emit("R0", lockUnlock);
             //    console.log(data);
                 console.log(data.toString());

                 break;

             case "L0":
                 const lockUnlock1 =    resp[5] + "," + resp[6] ;
                 console.log("this is L0:" + lockUnlock1);
                 this.eventEmitter.emit("L0", lockUnlock1);
               //  console.log(data);
                 console.log(data.toString());
                 break;
             case "L1":
                 const lockUnlock2 =    resp[5] + "," + resp[6] ;
                 console.log("this is L1:" + lockUnlock2);
                 this.eventEmitter.emit("L1", lockUnlock2);
                       //  console.log(data);
                 console.log(data.toString());
                 break;
             case "H0":
                 response = {scooterIdReal:resp[2], scooterStatus: resp[4], voltage: resp[5], signal: resp[6], power: resp[7], chargingStatus: resp[8]};
                 console.log(response);
                 let locStat: string;
                 console.log("command of hearthbeat");
                 if(resp[4]==="0"){
                     locStat = "unlocked";
                 }else{
                     locStat = "locked";
                 }
                 let charg:string;
                 if(resp[8]!=="0"){
                     charg = "false";
                 }else{
                     charg = "true";
                 }

                 if(resp[2]!=="0"){
                     console.log("a ajuns in try");
                    try{
                       const upda = await scooterService.updateRealScooter(resp[2], charg,parseInt(resp[7]),locStat);
                        console.log(upda);
                    }catch(err){console.log(err)};
                 }
                 this.eventEmitter.emit("H0",response)
                 console.log(data.toString());
                 break;
             case "V0":
                 this.eventEmitter.emit("V0", resp[4]);
                 console.log(data.toString());
                 break;
             case "D1":
                 console.log("this is d1 here is stops");
                 this.eventEmitter.emit("D1", resp);
                 break;
             case "D0":
                 try{
                     console.log("the resp " +resp);
                     if(resp.length>65) {
                         console.log("aici a ajuns");
                         const realScooter = await scooterService.findScooterIdByReal(resp[2]);
                         console.log("scooterId " + realScooter.scooterId);
                         const scooter = await rideService.findOngoingByScooterId(realScooter.scooterId);
                         const lat = this.giveMeCoordinatesLat(resp[7], resp[8]);
                         const long = this.giveMeCoordinatesLong(resp[9], resp[10]);
                         console.log("lat and long " + lat + long);
                         const last = scooter.intermediary[scooter.intermediary.length - 1];
                         const inter: [number, number] = [lat, long];
                         scooter.intermediary.push(inter);
                         const distance = this.giveMeDistance1(last[0], inter[0], last[1], inter[1]);
                         console.log("distata este de " + distance);
                         console.log("coordonatele sunt:" + inter);
                         await rideService.updateIntermediaryOngoingRideByScooterId(resp[2], scooter.intermediary, distance);
                         this.eventEmitter.emit("D0", resp);
                     }
                 }catch (err){
                     console.log(err);
                 }
                 break;
         }
     }

      giveMeCoordinatesLat(lat:string, poz: string){
         let distance;
         let dd:string;
          console.log("lat" + lat);
          console.log("poz"+poz);
          dd = lat.substring(0,2)
         let hour = parseInt(dd);
         let mm:string;
         mm = lat.substring(2, 9);

         let min = parseFloat(mm);

        if(poz==="N"){
            distance = hour +min/60;
        }else{
            distance = -(hour + min/60);
        }
        return distance;
     }
      giveMeCoordinatesLong(long:string, poz:string){
         let distance;
         let dd:string;
         console.log("long" + long);
         console.log("poz"+poz);
         dd = long.substring(0,3);
         let hour = parseInt(dd);
         let mm:string;
         mm = long.substring(3, 11);

         let min = parseFloat(mm);

         if(poz==="E"){
             distance = hour +min/60;
         }else{
             distance = -(hour + min/60);
         }
         return distance;
     }

      giveMeDistance1(lat1: number, lat2:number, long1:number, long2: number){
         console.log("lat1, lat2, long1, long2" + lat1 + lat2 + long1+long2);

         let p = 0.017453292519943295;    // Math.PI / 180
         let c = Math.cos;
         let a = 0.5 - c((lat2 - lat1) * p)/2 +
             c(lat1 * p) * c(lat2 * p) *
             (1 - c((long2 - long1) * p))/2;
         let c1 = 12742 * Math.asin(Math.sqrt(a));
         console.log(c1);
         return c1; // 2 * R; R = 6371 km
     }

     async ping(data:string ){
         const myString = "*SCOS,OM,867584033774352,V0,"+data+"#";
         this.client.write(myString);
         const result = await Promise.race([this.onEvent("V0"), this.onTimeout()]);
         console.log(result);
         return result;
     }


     async lockUnlockRequest(internalId: number, lock: number) {
         if (internalId === this.internalId) {
             console.log("Lock/Unlock req. sent!");
             this.client.write(
                 "*SCOS,OM,867584033774352,R0," +
                 String(lock) +
                 ",20,1234," +
                 Math.floor(Date.now()/1000) +
                 "#"
             );
             const result = await Promise.race( [this.onEvent("R0"), this.onTimeout()]);

             console.log("this is the res " + result);
             return result;

         }
     }

     async theUnlock(response){
         console.log("ajung si eu aici?");
         console.log("asta e response "+ response);
         const myString = "*SCOS,OM,867584033774352,L0," + response + "," + Math.floor(Date.now()/1000) + "#"
         this.client.write(
             myString
         );
         console.log("my string " +myString);
         const result = await Promise.race( [this.onEvent("L0"), this.onTimeout()]);
         console.log("this is the real lock result " + result);
         return result;
     }

     async theLock(response){
         const goodResponse = response.toString().split(",");
         console.log("ajung  eu aici?");
         console.log("asta e reponse "+ response);
         const myStringLock = "*SCOS,OM,867584033774352,L1," + goodResponse[0]+"#";
         this.client.write(
             myStringLock
         );
         console.log("my string " +myStringLock);
         const result = await Promise.race( [this.onEvent("L1"), this.onTimeout()]);
         console.log("this is the real lock result " + result);
         return result;
     }

     async hearthbeat(){

         const result = await Promise.race([this.onEvent("H0"), this.onTimeout()]);
        // return response

     }

     async getCoordinatesStart(time:string){
         const myString = "*SCOS,OM,867584033774352,D1," + time+"#";
         this.client.write(
             myString
         );
         const result = await Promise.race( [this.onEvent("D1"), this.onTimeout()]);
         console.log("this is the real lock result " + result);
         return result;
     }

     async getCoordinatesStop(){
         const myString = "*SCOS,OM,867584033774352,D1,0#";
         this.client.write(
             myString
         );
         const result = await Promise.race( [this.onEvent("D1"), this.onTimeout()]);
         console.log("this is the real lock result " + result);
         return result;
     }


     onEvent(eventName: string) {
         return new Promise((resolve, reject) => {
             this.eventEmitter.once(eventName, (response) => {
                resolve(response);
             });
         });
     }

     onTimeout() {
         return new Promise((resolve, reject) => {
             setTimeout(() => {
                 reject();
             }, 60000);
         });
     }


 }


