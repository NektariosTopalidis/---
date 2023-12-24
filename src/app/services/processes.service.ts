import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Process } from '../models/process.model';

@Injectable({
  providedIn: 'root'
})
export class ProcessesService {

  constructor() { }

  private _addingProcess: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _processes: BehaviorSubject<Process[]> = new BehaviorSubject<Process[]>([new Process('b1',0,4,3),new Process('b2',1,5,1),new Process('b3',4,4,2),new Process('b4',6,3,3)]);

  get processes(){
    return this._processes.asObservable();
  }

  get addingProcess(){
    return this._addingProcess.asObservable();
  }

  openAddProcessModal(){
    this._addingProcess.next(true);
  }

  closeAddProcessModal(){
    this._addingProcess.next(false);
  }

  addProcess(process: Process){
    const newProcessesArray = this._processes.value.concat(process);
    this._processes.next(newProcessesArray);
    this._addingProcess.next(false);
  }

  clearProcesses(){
    this._processes.next([]);
  }
}
