import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, interval, switchMap, takeUntil } from 'rxjs';
import { DeadlineService } from '../../services/deadline.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-countdown',
  template: `<div class="countdown">Seconds left to deadline: {{ secondsLeft }}</div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule
  ],
})
export class CountdownComponent implements OnInit, OnDestroy {
  secondsLeft: number = 0;
  private destroy$ = new Subject<void>();

  constructor(private deadlineService: DeadlineService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.deadlineService.getDeadlineSeconds().pipe(
      takeUntil(this.destroy$),
      switchMap((res) => {
        this.secondsLeft = res.secondsLeft;
        this.cdr.detectChanges();
        return interval(1000);
      })
    ).subscribe(() => {
      if (this.secondsLeft > 0) {
        this.secondsLeft--;
        this.cdr.detectChanges();
      }
    }, (err) => {
      console.error('Error fetching deadline: ', err);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
