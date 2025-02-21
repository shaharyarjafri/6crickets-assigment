import { Component } from '@angular/core';
import { CountdownComponent } from './countdown/components/countdown/countdown.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [CountdownComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'countdown-timer';
}
