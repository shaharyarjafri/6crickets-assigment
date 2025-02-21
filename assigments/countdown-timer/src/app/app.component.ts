import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CountdownModule } from './countdown/countdown.module';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CountdownModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'countdown-timer';
}
