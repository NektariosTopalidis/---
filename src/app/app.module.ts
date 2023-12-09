import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProcessFormModule } from './components/process-form/process-form.module';
import { QueueComponent } from './components/queue/queue.component';

@NgModule({
  declarations: [
    AppComponent,
    QueueComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProcessFormModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
