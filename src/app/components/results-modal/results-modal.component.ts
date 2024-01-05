import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { resultData } from '../../app.component';
import { Subscription } from 'rxjs';
import { Process } from '../../models/process.model';
import { ProcessesService } from '../../services/processes.service';

@Component({
  selector: 'app-results-modal',
  templateUrl: './results-modal.component.html',
  styleUrl: './results-modal.component.scss'
})
export class ResultsModalComponent implements OnInit{
  @Output() closeResultsModalEvent = new EventEmitter();
  @Input('idleTime') idleTime: number = 0;
  @Input('responseTimes') responseTimes: resultData[] = [];
  @Input('turnaroundTimes') turnaroundTimes: resultData[] = [];

  responseTimeTotal: number = 0;
  turnaroundTimeTotal: number = 0;

  processesSubscription!: Subscription;
  serviceTimesSubscriptions!: Subscription;
  processes: Process[] = [];
  serviceTimes: number[] = []; 

  constructor(private processesService: ProcessesService){}

  ngOnInit(): void {
    let responseTimesSum: number = 0
    for(let responseTime of this.responseTimes){
      responseTimesSum += responseTime.time;
    }
    this.responseTimeTotal = responseTimesSum/this.responseTimes.length;

    let turnAroundTimeSum: number = 0;
    for(let turnaroundTime of this.turnaroundTimes){
      turnAroundTimeSum += turnaroundTime.time;
    }
    this.turnaroundTimeTotal = turnAroundTimeSum/this.turnaroundTimes.length;

    this.processesSubscription = this.processesService.processes.subscribe((processes) => {
      this.processes = processes
    })

  }

  closeResultsModal(e: Event){
    this.closeResultsModalEvent.emit();
  }
}
