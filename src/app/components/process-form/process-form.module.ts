import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcessFormRoutingModule } from './process-form-routing.module';
import { ProcessFormComponent } from './process-form.component';
import { ProcessesService } from '../../services/processes.service';

@NgModule({
  declarations: [ProcessFormComponent],
  imports: [
    CommonModule,
    ProcessFormRoutingModule
  ],
  providers: [
    ProcessesService
  ],
  exports: [
    ProcessFormComponent
  ]
})
export class ProcessFormModule { }
