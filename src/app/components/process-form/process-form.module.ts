import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcessFormRoutingModule } from './process-form-routing.module';
import { ProcessFormComponent } from './process-form.component';
import { ProcessesService } from '../../services/processes.service';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
  declarations: [ProcessFormComponent],
  imports: [
    CommonModule,
    ProcessFormRoutingModule,
    MatTooltipModule
  ],
  providers: [
    ProcessesService
  ],
  exports: [
    ProcessFormComponent
  ]
})
export class ProcessFormModule { }
