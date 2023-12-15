import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateProcessModalRoutingModule } from './create-process-modal-routing.module';
import { CreateProcessModalComponent } from './create-process-modal.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [CreateProcessModalComponent],
  imports: [
    CommonModule,
    CreateProcessModalRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CreateProcessModalComponent
  ]
})
export class CreateProcessModalModule { }
