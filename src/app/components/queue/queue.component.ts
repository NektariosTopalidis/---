import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Process } from '../../models/process.model';
import { RoundRobinService } from '../../services/round-robin.service';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrl: './queue.component.scss'
})
export class QueueComponent implements OnInit,OnDestroy{
  @Input('step') step: number = 0;
  

  private queueSubscription!: Subscription;
  
  tempData = [0,1,2,3,4,5,6,7,8,9];
  queueData: Process[] = [];

  constructor(private roundRobinService: RoundRobinService){}

  ngOnInit(): void {
    this.queueSubscription = this.roundRobinService.queue.subscribe(queue => {
      
      this.queueData = queue.data;
      
      let amountOfDataRemaining = 10 - this.queueData.length;

      let tempArr = [];

      for (let i = 0; i < amountOfDataRemaining; i++) {
        tempArr.push(i);
      }

      this.tempData = tempArr;

    })
  }

  ngOnDestroy(): void {
    if(this.queueSubscription) this.queueSubscription.unsubscribe();
  }

}
