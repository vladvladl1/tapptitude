import { Socket } from "net";

 export class TCPConnectionService{
     client = new Socket();
     internalId: number = 1234;
     private eventEmitter: any;
     constructor(){
         console.log("***")
         this.client.on('connect', ()=> console.log("I'm in"))
         this.client.on('close', () => console.log("I'm out"))
         this.client.on('error', (error) => console.error(error))
         this.client.on('data', (data) => this.handleData(data) )
         this.client.connect(5001,'ec2-18-156-36-228.eu-central-1.compute.amazonaws.com')
         setTimeout(() => {
             this.client.write('*SCOS,OM,867584033774352,S6#')
         }, 2000);
     }
     private handleData(data: Buffer){
         console.log(data)
         console.log(data.toString())
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
                 Date.now() +
                 "#"
             );
             const result = await this.onEvent("R0");
             console.log("this is the res" + result);
             return result;
             this.client.read()
         }
     }

     onEvent(eventName: string) {
         return new Promise((resolve, reject) => {
             this.eventEmitter.emit("R0", (lockUnlockResponse) => {
                 resolve(lockUnlockResponse);
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


