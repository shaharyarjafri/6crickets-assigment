import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment';

@Injectable({
  providedIn: 'root'
})
export class DeadlineService {
  private apiUrl = `${environment.apiUrl}/deadline`;

  constructor(private http: HttpClient) {}

  getDeadlineSeconds(): Observable<{ secondsLeft: number }> {
    return this.http.get<{ secondsLeft: number }>(this.apiUrl);
  }

  // getDeadlineSeconds(): Observable<{ secondsLeft: number }> {
  //   let secondsLeft = 100;
  //   return new Observable((observer) => {
  //     const interval = setInterval(() => {
  //       if (secondsLeft > 0) {
  //         secondsLeft--;
  //         observer.next({ secondsLeft });
  //       } else {
  //         clearInterval(interval);
  //         observer.complete();
  //       }
  //     }, 1000);
  //   });
  // }
}