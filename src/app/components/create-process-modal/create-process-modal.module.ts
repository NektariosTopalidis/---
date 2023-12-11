import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateProcessModalRoutingModule } from './create-process-modal-routing.module';
import { CreateProcessModalComponent } from './create-process-modal.component';


@NgModule({
  declarations: [CreateProcessModalComponent],
  imports: [
    CommonModule,
    CreateProcessModalRoutingModule
  ],
  exports: [
    CreateProcessModalComponent
  ]
})
export class CreateProcessModalModule { }
