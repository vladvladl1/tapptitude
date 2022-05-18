import { Socket } from "net";
import {EventEmitter} from "events";

 export class TCPConnectionService{
     client = new Socket();
     internalId: number = 1234;
     private eventEmitter = new EventEmitter();
     constructor(){
         console.log("***")
         this.client.on('connect', ()=> console.log("I'm in"))
         this.client.on('close', () => console.log("I'm out"))
         this.client.on('error', (error) => console.error(error))
         this.client.on('data', (data) => this.handleData(data) )
         this.client.connect(5001,'ec2-18-156-36-228.eu-central-1.compute.amazonaws.com')

     }
     private handleData(data: Buffer){
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
                 console.log("this is L0:" + lockUnlock2);
                 this.eventEmitter.emit("L0", lockUnlock2);
                 //  console.log(data);
                 console.log(data.toString());
                 break;
         }
     }
     ping(){
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
         const result = await Promise.race( [this.onEvent("L0"), this.onTimeout()]);
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


