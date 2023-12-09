import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcessFormRoutingModule } from './process-form-routing.module';
import { ProcessFormComponent } from './process-form.component';


@NgModule({
  declarations: [ProcessFormComponent],
  imports: [
    CommonModule,
    ProcessFormRoutingModule
  ],
  exports: [
    ProcessFormComponent,
  ]
})
export class ProcessFormModule { }
