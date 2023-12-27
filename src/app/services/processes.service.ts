import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Process } from '../models/process.model';

@Injectable({
  providedIn: 'root'
})
export class ProcessesService {

  constructor() { }

  private P1 = new Process('P1',0,6,2); 
  private P2 = new Process('P2',3,4,2); 
  private P3 = new Process('P3',1,4,3); 
  private P4 = new Process('P4',6,3,2); 
  private P5 = new Process('P5',10,3,1); 
  private P6 = new Process('P6',12,3,5); 
  private pArr = [this.P1,this.P2,this.P3];
  private _addingProcess: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _processes: BehaviorSubject<Process[]> = new BehaviorSubject<Process[]>([]);

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
