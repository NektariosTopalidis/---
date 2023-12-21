import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Process } from '../models/process.model';

@Injectable({
  providedIn: 'root'
})
export class ProcessesService {

  constructor() { }

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
