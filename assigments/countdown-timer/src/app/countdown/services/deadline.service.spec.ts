import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DeadlineService } from './deadline.service';
import { environment } from '../../../../environment';

describe('DeadlineService', () => {
  let service: DeadlineService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DeadlineService]
    });

    service = TestBed.inject(DeadlineService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch deadline seconds from API', () => {
    const mockResponse = { secondsLeft: 120 };

    service.getDeadlineSeconds().subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/deadline`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should handle API errors gracefully', () => {
    const errorMessage = 'Failed to fetch data';

    service.getDeadlineSeconds().subscribe({
      next: () => fail('Expected an error, not data'),
      error: (error) => {
        expect(error.status).toBe(500);
        expect(error.statusText).toBe('Internal Server Error');
      }
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/deadline`);
    expect(req.request.method).toBe('GET');
    req.flush(errorMessage, { status: 500, statusText: 'Internal Server Error' });
  });
});
