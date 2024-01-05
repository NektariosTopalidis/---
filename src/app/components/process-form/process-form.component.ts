import { Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Process } from '../../models/process.model';
import { ProcessesService } from '../../services/processes.service';
import { Subscription } from 'rxjs';
import { Queue } from '../../models/queue.model';

@Component({
  selector: 'app-process-form',
  templateUrl: './process-form.component.html',
  styleUrl: './process-form.component.scss'
})
export class ProcessFormComponent implements OnInit, OnDestroy{
    @ViewChild('tableHead') tableHead!: HTMLDivElement;
    @Input('disableAddProcesses') disableAddProcesses!: boolean;

    constructor(private processesService: ProcessesService ){}

    private processesSub!: Subscription;

    processes: Process[] = [];
    
    ngOnInit(): void {
      this.processesSub = this.processesService.processes.subscribe( processes => {
        this.processes = processes;
      })
    }

    openAddProcessModal(e: MouseEvent){
      this.processesService.openAddProcessModal();
    }

    generateRandomProcesses(){
      this.processesService.clearProcesses();

      setTimeout(() => {
        for (let i = 0; i < 5; i++) {
          let randomProcess: Process;
          
          const id = 'P' + i;
          const arrivalTime = i===0? 0 : Math.floor(Math.random() * 10) + 1;
          const serviceTime = Math.floor(Math.random() * 6) + 1;
          const priority =  Math.floor(Math.random() * 7) + 1;
          
          randomProcess = new Process(id,arrivalTime,serviceTime,priority);
  
          this.processesService.addProcess(randomProcess);
  
        }
      },500);
    }

    ngOnDestroy(): void {
      if(this.processesSub) this.processesSub.unsubscribe();
    }
}
