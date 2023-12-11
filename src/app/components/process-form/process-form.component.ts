import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { Process } from '../../models/process.model';
import { ProcessesService } from '../../services/processes.service';
import { Subscription } from 'rxjs';

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

    ngOnInit(): void {
      this.processesSub = this.processesService.processes.subscribe( processes => {
        if(processes.length > 0){
          this.processes = processes;
        }
      })
    }
}
