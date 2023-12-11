import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProcessFormModule } from './components/process-form/process-form.module';
import { CreateProcessModalModule } from './components/create-process-modal/create-process-modal.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProcessFormModule,
    CreateProcessModalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
