import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProcessesService } from './services/processes.service';
import { Subscription } from 'rxjs';
import { RoundRobinService } from './services/round-robin.service';
import { Process } from './models/process.model';

export interface resultData{
  id: string;
  time: number;
}

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
  isFinished: boolean = false; 

  disableAddProcesses: boolean = false;

  processes: Process[] = [];
  responseTimes: resultData[] = [];
  turnaroundTimes: resultData[] = [];
  idleTime: number = 0;


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

  async start(e: number){  
    this.q = e;
      
    this.disableAddProcesses = true;
    for(let process of this.processes){
      if(process.arrivalTime === 0 && !process.isQueued){
        await this.roundRobinService.enqueue(process,true,this.step,this.q,false);
        process.isQueued = true;
      }
    }

    this.timer = setInterval(async () => {


      setTimeout(async () => {
        let popedProcess = await this.roundRobinService.dequeue(this.step,this.q);
        
        
        if(popedProcess){
          if(popedProcess.serviceTime<this.q){
            popedProcess.turnAroundTime += popedProcess.serviceTime;
            this.idleTime += (this.q - popedProcess.serviceTime);
            popedProcess.serviceTime = 0;
          }
          else if(popedProcess.serviceTime === this.q){
            popedProcess.turnAroundTime += this.q;
            popedProcess.serviceTime -= this.q;
          }
          else{
            popedProcess.serviceTime -= this.q;
          }
        } 

        if(!popedProcess && this.processes.find(p => p.arrivalTime >= this.step)){
          this.idleTime += this.q;
        }
        
        if(!popedProcess && !this.processes.find(p => p.arrivalTime >= this.step)){
          this.processesService.restoreProcessesServiceTimes();
          for(let p of this.processes){
            this.responseTimes = this.responseTimes.concat({id: p.id,time: p.responseTime});
            this.turnaroundTimes = this.turnaroundTimes.concat({id: p.id,time: p.turnAroundTime});
          }
          this.step = 0;
          this.idleTime = 0;
          this.disableAddProcesses = false;
          this.isFinished = true;
          clearInterval(this.timer);
        }
        else{
          this.step += this.q;

          let processesAdded: number = 0;

          for(let process of this.processes){
            if(process.isQueued && process.serviceTime > 0){
              process.turnAroundTime += this.q;
            }

            if(process.arrivalTime === this.step && !process.isQueued){
              if(processesAdded > 0){
                await this.roundRobinService.enqueue(process,true,this.step,this.q,true);
              }
              else{
                await this.roundRobinService.enqueue(process,true,this.step,this.q,false);
              }
              process.isQueued = true;
              processesAdded++;
            }

            if(process.arrivalTime < this.step && !process.isQueued){
              process.turnAroundTime += (this.step - process.arrivalTime);
              if(processesAdded > 0){
                await this.roundRobinService.enqueue(process,true,this.step,this.q,true);
              }
              else{
                await this.roundRobinService.enqueue(process,true,this.step,this.q,false);
              }
              process.isQueued = true;
              processesAdded++;
            }
          }

          if(popedProcess && popedProcess.serviceTime > 0){
            await this.roundRobinService.enqueue(popedProcess,false,this.step,this.q,false);
          }
          
          processesAdded = 0;
        }
      },1000)


      
      
    },4000);
  }

  closeResultsModal(){
    this.processesService.clearProcesses();
    this.isFinished = false;
  }

  ngOnDestroy(): void {
    if(this.toggleAddProcessModalSubscription) this.toggleAddProcessModalSubscription.unsubscribe();
    if(this.processesSub) this.processesSub.unsubscribe();
  }

}
