import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Process } from '../models/process.model';

@Injectable({
  providedIn: 'root'
})
export class ProcessesService {

  constructor() { }

  private P0 = new Process('P0',0,5,1); 
  private P1 = new Process('P1',2,5,3); 
  private P2 = new Process('P2',10,5,7); 
  private P3 = new Process('P3',8,1,7); 
  private P4 = new Process('P4',5,3,2); 
  private pArr = [this.P0,this.P1,this.P2,this.P3,this.P4];
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
