import { Component, OnInit } from '@angular/core';
import { ProcessesService } from '../../services/processes.service';
import { Process } from '../../models/process.model';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-process-modal',
  templateUrl: './create-process-modal.component.html',
  styleUrl: './create-process-modal.component.scss'
})
export class CreateProcessModalComponent implements OnInit {
  processForm!: FormGroup;

  currentProcesses: Process[] = [];
  currentProcessesSubscription!: Subscription;
  flag: boolean = true;
  idExists?: Process;

  ngOnInit(): void {
    this.processForm = new FormGroup((
      {
        id: new FormControl(),
        arrivalTime: new FormControl(),
        serviceTime: new FormControl(),
        priority: new FormControl()
      }
    ))

    this.currentProcessesSubscription = this.processesService.processes.subscribe((processes) => {
      if(this.flag){
        this.currentProcesses = processes; 
        this.flag = false;
      }
    })
  }

  constructor(private processesService: ProcessesService){}

  closeAddProcessModal(event: MouseEvent){
    this.processesService.closeAddProcessModal();
  }

  addProcess(){
    
    const id = this.processForm.value.id;

    this.idExists = this.currentProcesses.find(p => p.id === id);

    if(!this.idExists){
      const arrivalTime = this.processForm.value.arrivalTime;
      const serviceTime = this.processForm.value.serviceTime;
      const priority = this.processForm.value.priority;
  
      const process = new Process(id,arrivalTime,serviceTime,priority);
  
      this.processesService.addProcess(process);
  
      this.processForm.reset(); 
    }
  }
}
