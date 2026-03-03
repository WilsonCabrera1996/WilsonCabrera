import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { errorInterceptor } from './error.interceptor';

describe('errorInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([errorInterceptor])),
        provideHttpClientTesting(),
      ],
    });

    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('creado', () => {
    expect(errorInterceptor).toBeTruthy();
  });

  it('error en el servidor', (done) => {
    const mockErrorResponse = { status: 500, statusText: 'Internal Server Error' };
    const errorMessage = 'Ocurrió un error en el servidor';

    httpClient.get('/test-error').subscribe({
      next: () => fail('Debería haber fallado con un error 500'),
      error: (error) => {
        expect(error).toBeTruthy();
        done();
      }
    });

    const req = httpMock.expectOne('/test-error');
    req.flush(errorMessage, mockErrorResponse);
  });

  it('Error del cliente/red', (done) => {

    const mockError = new ErrorEvent('Error de red ', {
      message: 'Error de red detectado'
    });

    httpClient.get('/client-error').subscribe({
      next: () => fail('Debería haber fallado'),
      error: (error) =>{
        expect(error).toBeTruthy();
        done();
      }
    });

    const req = httpMock.expectOne('/client-error');

    req.error(mockError);
  });
});