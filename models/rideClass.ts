

export class Rides{
    username: string;
    scooterId: string;
    price: number;
    time: number;
    start: {type:string, coordinates: [number, number]};
    stop: {type:string, coordinates: [number, number]};
    intermediary: [number, number][];
    distance:number;
    dateOfStart: Date;

    constructor(username, scooterId, price, time, start, stop, dateOfStart, intermediary) {
        this.username = username;
        this.scooterId = scooterId;
        this.price = price;
        this.time = time;
        this.stop = stop;
        this.start= start;
        this.dateOfStart = dateOfStart;
        this.intermediary = intermediary;
    }


}