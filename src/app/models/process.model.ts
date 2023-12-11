export class Process {

    id!: string;
    arrivalTime!: number;
    serviceTime!: number;
    priority!: number;

    constructor(id: string,arrivalTime: number,serviceTime: number,priority: number){
        this.id = id;
        this.arrivalTime = arrivalTime;
        this.serviceTime = serviceTime;
        this.priority = priority;
    }

}
