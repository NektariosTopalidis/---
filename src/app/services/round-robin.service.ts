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

  async enqueue(process: Process,firstTime: boolean){
    let tempQueue: Queue<Process> = this._queue.value;
    
    if(tempQueue.head && process.priority === tempQueue.head.priority && firstTime){
      tempQueue.preAssign(process);
    }
    else{
      tempQueue.enQueue(process);
    }
    this._queue.next(tempQueue);
  } 

  async dequeue(){
    let tempQueue: Queue<Process> = this._queue.value;
    let popepProcess: Process | undefined = tempQueue.deQueue();
    this._queue.next(tempQueue);
    return popepProcess;
  }

  constructor() { }
}
