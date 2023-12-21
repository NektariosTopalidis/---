import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProcessFormModule } from './components/process-form/process-form.module';
import { CreateProcessModalModule } from './components/create-process-modal/create-process-modal.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QueueModule } from './components/queue/queue.module';
import { ChartModule } from './components/chart/chart.module';
import { RoundRobinService } from './services/round-robin.service';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProcessFormModule,
    QueueModule,
    ChartModule,
    CreateProcessModalModule,
    BrowserAnimationsModule
  ],
  providers: [RoundRobinService],
  bootstrap: [AppComponent]
})
export class AppModule { }
