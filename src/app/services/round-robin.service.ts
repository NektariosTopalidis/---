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

    tempQueue.enQueue(process);
    if(process.priority === tempQueue.data[tempQueue.data.length-1].priority && process.id !== tempQueue.data[tempQueue.data.length-1].id && firstTime){
      let i = tempQueue.data.indexOf(process);
      console.log(i);
      tempQueue.preAssign(process,i);
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
