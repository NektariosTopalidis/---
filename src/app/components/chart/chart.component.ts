import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent implements OnInit {

  quantumTimeForm!: FormGroup;

  @Output() start = new EventEmitter();

  ngOnInit(): void {
    this.quantumTimeForm = new FormGroup((
      {
        q: new FormControl()
      }
    ))
  }

  sendStart(){
    this.start.emit();
  }
}
