export class Process {

    id!: string;
    arrivalTime!: number;
    serviceTime!: number;
    priority!: number;
    private _isQueued: boolean = false;

    constructor(id: string,arrivalTime: number,serviceTime: number,priority: number){
        this.id = id;
        this.arrivalTime = arrivalTime;
        this.serviceTime = serviceTime;
        this.priority = priority;
    }

    setIsQueued(isQueued: boolean){
        this._isQueued = isQueued;
    }

    get isQueued(){
        return this._isQueued;
    }


}
