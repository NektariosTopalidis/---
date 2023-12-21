import { Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
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

    ngOnDestroy(): void {
      if(this.processesSub) this.processesSub.unsubscribe();
    }
}
