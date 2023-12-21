import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent {

  @Output() start = new EventEmitter();


  sendStart(){
    this.start.emit();
  }
}
