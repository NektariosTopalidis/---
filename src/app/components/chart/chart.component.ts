import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProcessesService } from '../../services/processes.service';
import { Subscription } from 'rxjs';
import { Process } from '../../models/process.model';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent implements OnInit, OnDestroy {

  quantumTimeForm!: FormGroup;

  @Output() start = new EventEmitter();
  
  private processesSub!: Subscription;
  processes: Process[] = [];

  constructor(private processesService: ProcessesService){}

  ngOnInit(): void {
    this.quantumTimeForm = new FormGroup((
      {
        q: new FormControl()
      }
    ))

    this.processesSub = this.processesService.processes.subscribe((processes) => {
      this.processes = processes;
    })
  }

  sendStart(){
    const q = this.quantumTimeForm.value.q;

    this.start.emit(q);
  }

  ngOnDestroy(): void {
    if(this.processesSub) this.processesSub.unsubscribe();
  }
}
