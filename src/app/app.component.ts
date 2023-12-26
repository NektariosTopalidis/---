import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProcessesService } from './services/processes.service';
import { Subscription } from 'rxjs';
import { RoundRobinService } from './services/round-robin.service';
import { Process } from './models/process.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'SLS-Project';

  constructor(private processesService: ProcessesService,private roundRobinService: RoundRobinService){}

  addingProcess: boolean = false; 
  private toggleAddProcessModalSubscription!: Subscription;
  private processesSub!: Subscription;

  q: number = 1;
  timer?: any;
  step: number = 0;

  disableAddProcesses: boolean = false;

  processes: Process[] = [];

  ngOnInit(): void {
    this.toggleAddProcessModalSubscription = this.processesService.addingProcess.subscribe((addingProcess) => {
      this.addingProcess = addingProcess;
    })

    this.processesSub = this.processesService.processes.subscribe( processes => {
      if(processes.length > 0){
        this.processes = processes;
      }
    })
  }

  start(e: number){  
    this.q = e;
      
    this.disableAddProcesses = true;
    this.timer = setInterval(async () => {

      for(let process of this.processes){
        if(process.arrivalTime === this.step){
          await this.roundRobinService.enqueue(process,true);
        }
      }

      
      let popedProcess = await this.roundRobinService.dequeue();
      
      console.log(this.step);
      
      
      if(popedProcess){
        popedProcess.serviceTime = popedProcess.serviceTime<this.q?  0 : popedProcess.serviceTime - this.q;
        console.log(popedProcess.id + ': ' + popedProcess.serviceTime);
        if(popedProcess.serviceTime > 0){
          await this.roundRobinService.enqueue(popedProcess,false);
        }
      } 
      
      if(!popedProcess && !this.processes.find(p => p.arrivalTime >= this.step)){
        this.processesService.clearProcesses();
        this.step = 0;
        this.disableAddProcesses = false;
        clearInterval(this.timer);
      }
      else{
        this.step += this.q;
      }

      
      
    },3000);
  }

  ngOnDestroy(): void {
    if(this.toggleAddProcessModalSubscription) this.toggleAddProcessModalSubscription.unsubscribe();
    if(this.processesSub) this.processesSub.unsubscribe();
  }

}
