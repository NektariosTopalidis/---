import { Component, OnInit, ViewChild} from '@angular/core';
import { Process } from '../../models/process.model';
import { ProcessesService } from '../../services/processes.service';
import { Subscription } from 'rxjs';
import { QueueClass } from '../../models/queue.model';

@Component({
  selector: 'app-process-form',
  templateUrl: './process-form.component.html',
  styleUrl: './process-form.component.scss'
})
export class ProcessFormComponent implements OnInit{
    @ViewChild('tableHead') tableHead!: HTMLDivElement;

    constructor(private processesService: ProcessesService ){}

    private processesSub!: Subscription;

    processes: Process[] = [];
    queue: QueueClass<Process> = new QueueClass(10);

    ngOnInit(): void {
      this.processesSub = this.processesService.processes.subscribe( processes => {
        if(processes.length > 0){
          this.processes = processes;
        }
      })
    }

    createQueue(){
      for(let process of this.processes){
        this.queue.enQueue(process);
      }
    }

    preAssign(){
      const process: Process = {
        id: 'b2',
        arrivalTime: 10,
        serviceTime: 4,
        priority: 3
      }

      this.queue.preAssign(process);
    }

    openAddProcessModal(e: MouseEvent){
      this.processesService.openAddProcessModal();
    }
}
