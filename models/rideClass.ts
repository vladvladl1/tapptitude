

export class Rides{
    username: string;
    scooterId: string;
    price: number;
    time: number;
    start: {type:string, coordinates: [number]};
    stop: {type:string, coordinates: [number]};
    dateOfStart: Date;

    constructor(username, scooterId, price, time, start, stop, dateOfStart) {
        this.username = username;
        this.scooterId = scooterId;
        this.price = price;
        this.time = time;
        this.stop = stop;
        this.start= start;
        this.dateOfStart = dateOfStart;
    }


}