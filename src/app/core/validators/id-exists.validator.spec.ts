import { of, throwError, Observable } from 'rxjs';
import { IdExistsValidator } from './id-exists.validator';
import { FormControl } from '@angular/forms';

describe('IdExistsValidator', () => {
  let productServiceMock: any;

  beforeEach(() => {
    productServiceMock = {
      verifyIDExists: jest.fn() 
    };
  });

  it('debe retornar null si el control no tiene valor', (done) => {
    const validator = IdExistsValidator(productServiceMock);
    const control = new FormControl('');

    (validator(control) as Observable<any>).subscribe(result => {
      expect(result).toBeNull();
      done();
    });
  });

  it('debe retornar { IdExists: true } si el ID ya existe', (done) => {
    productServiceMock.verifyIDExists.mockReturnValue(of(true));
    const validator = IdExistsValidator(productServiceMock);
    const control = new FormControl('p-001');

    (validator(control) as Observable<any>).subscribe(result => {
      expect(result).toEqual({ IdExists: true }); 
      done();
    });
  });

  it('debe retornar null si el ID no existe', (done) => {
    productServiceMock.verifyIDExists.mockReturnValue(of(false));
    const validator = IdExistsValidator(productServiceMock);
    const control = new FormControl('p-new');

    (validator(control) as Observable<any>).subscribe(result => {
      expect(result).toBeNull();
      done();
    });
  });

  it('debe retornar null si el servicio falla (catchError)', (done) => {
    productServiceMock.verifyIDExists.mockReturnValue(throwError(() => new Error('Error')));
    const validator = IdExistsValidator(productServiceMock);
    const control = new FormControl('p-error');

    (validator(control) as Observable<any>).subscribe(result => {
      expect(result).toBeNull();
      done();
    });
  });
});