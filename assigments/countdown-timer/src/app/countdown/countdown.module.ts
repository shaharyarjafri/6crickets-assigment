import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountdownComponent } from './components/countdown/countdown.component';
import { DeadlineService } from './services/deadline.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [CountdownComponent],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers:[DeadlineService],
  exports:[CountdownComponent]
})
export class CountdownModule { }
