import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultsModalRoutingModule } from './results-modal-routing.module';
import { ResultsModalComponent } from './results-modal.component';


@NgModule({
  declarations: [ResultsModalComponent],
  imports: [
    CommonModule,
    ResultsModalRoutingModule
  ],
  exports: [
    ResultsModalComponent
  ]
})
export class ResultsModalModule { }
