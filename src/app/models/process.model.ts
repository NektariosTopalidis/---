export class Process {

    id!: string;
    arrivalTime!: number;
    serviceTime!: number;
    priority!: number;
    turnAroundTime: number = 0;

    responseTime: number = 0;
    hasBeenPoppedOnce: boolean = false;
    firstTimeInQueue: boolean = false;

    isQueued: boolean = false;


    constructor(id: string,arrivalTime: number,serviceTime: number,priority: number){
        this.id = id;
        this.arrivalTime = arrivalTime;
        this.serviceTime = serviceTime;
        this.priority = priority;
    }



}
