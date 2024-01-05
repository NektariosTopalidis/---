import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Queue } from '../models/queue.model';
import { Process } from '../models/process.model';

@Injectable({
  providedIn: 'root'
})
export class RoundRobinService {

  private _queue: BehaviorSubject<Queue<Process>> = new BehaviorSubject<Queue<Process>>(new Queue(10));

  get queue(){
    return this._queue.asObservable();
  }

  constructor() { }

  async enqueue(process: Process,firstTime: boolean,step: number,q:number,moreThanOneProcessAdded: boolean){
    let tempQueue: Queue<Process> = this._queue.value;

    if(firstTime) process.firstTimeInQueue = true;
    
    tempQueue.enQueue(process,moreThanOneProcessAdded);

    // if(process.priority === tempQueue.data[tempQueue.data.length-1].priority && process.id !== tempQueue.data[tempQueue.data.length-1].id && firstTime){
    //   let processesWithSamePriority: number = 0;
      
    //   tempQueue.data.forEach((p) => {
    //     if(p.priority === process.priority && p.id != process.id){
    //       processesWithSamePriority++;
    //     }
    //   })

    //   if(processesWithSamePriority === 1){
    //     let i = tempQueue.data.indexOf(process);
    //     tempQueue.preAssign(process,i);
    //   }
      
    // }

    tempQueue.data.forEach((p) => {
      if(p.arrivalTime < step && p.firstTimeInQueue){
        p.responseTime += (step-p.arrivalTime);
        p.firstTimeInQueue = false;
      }
    })

    this._queue.next(tempQueue);
  } 

  async dequeue(step: number,q:number){
    let tempQueue: Queue<Process> = this._queue.value;


    tempQueue.data.forEach((p) => {
      if(!p.hasBeenPoppedOnce){

        
        let headID = this._queue.value.data[this._queue.value.data.length-1].id;
      
        
        if(p.arrivalTime === step && p.firstTimeInQueue && p.id != headID) p.responseTime += q;
        
        if(!p.firstTimeInQueue && p.id != headID) p.responseTime += q;
        
        if(p.firstTimeInQueue) p.firstTimeInQueue = false;
        
        
      }
    })

    let popepProcess: Process | undefined = tempQueue.deQueue();
    this._queue.next(tempQueue);
    if(popepProcess) popepProcess.hasBeenPoppedOnce = true;
    return popepProcess;
  }
  
}
