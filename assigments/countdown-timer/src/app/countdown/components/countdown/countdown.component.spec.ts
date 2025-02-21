import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { DeadlineService } from '../../services/deadline.service';
import { CountdownComponent } from './countdown.component';

describe('CountdownComponent', () => {
  let component: CountdownComponent;
  let fixture: ComponentFixture<CountdownComponent>;
  let deadlineService: jasmine.SpyObj<DeadlineService>;
  let cdr: ChangeDetectorRef;

  beforeEach(async () => {
    const deadlineServiceSpy = jasmine.createSpyObj('DeadlineService', ['getDeadlineSeconds']);
    
    await TestBed.configureTestingModule({
      declarations: [CountdownComponent],
      providers: [
        { provide: DeadlineService, useValue: deadlineServiceSpy },
        ChangeDetectorRef
      ]
    }).compileComponents();

    deadlineService = TestBed.inject(DeadlineService) as jasmine.SpyObj<DeadlineService>;
    cdr = TestBed.inject(ChangeDetectorRef);
    fixture = TestBed.createComponent(CountdownComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch seconds left and start countdown', fakeAsync(() => {
    const mockSecondsLeft = 5;
    deadlineService.getDeadlineSeconds.and.returnValue(of({ secondsLeft: mockSecondsLeft }));

    component.ngOnInit();
    tick();

    expect(component.secondsLeft).toBe(mockSecondsLeft);

    tick(1000);
    expect(component.secondsLeft).toBe(4);
    
    tick(3000);
    expect(component.secondsLeft).toBe(1);

    tick(1000);
    expect(component.secondsLeft).toBe(0);

    tick(1000);
    expect(component.secondsLeft).toBe(0);

    component.ngOnDestroy();
  }));

  it('should handle API error gracefully', () => {
    const errorMessage = 'API Error';
    spyOn(console, 'error');
    deadlineService.getDeadlineSeconds.and.returnValue(throwError(() => new Error(errorMessage)));

    component.ngOnInit();

    expect(console.error).toHaveBeenCalledWith('Error fetching deadline: ', jasmine.any(Error));
    expect(component.secondsLeft).toBe(0);
  });

  it('should clean up subscriptions on destroy', () => {
    const destroySpy = spyOn(component['destroy$'], 'next').and.callThrough();
    const completeSpy = spyOn(component['destroy$'], 'complete').and.callThrough();

    component.ngOnDestroy();

    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
