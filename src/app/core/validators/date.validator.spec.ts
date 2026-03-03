
import { FormControl, FormGroup } from '@angular/forms';
import { DateValidators } from './date.validator';

describe('DateValidators', () => {
  describe('minDate', ()=>{
    it('debería retornar null si date es hoy', () => {
      const today = new Date().toISOString().split('T')[0];
      const control = new FormControl(today);
      expect(DateValidators.minDate(control)).toBeNull();
    } );

    it('debería retornar error si date es pasado', () => {
      const control = new FormControl('2000-01-01');
      expect(DateValidators.minDate(control)).toEqual({dateInPast: true});
    });

    it('deberia retornar null si no tiene valor', () =>{
      const control = new FormControl('');
      const result = DateValidators.minDate(control);
      expect(result).toBeNull();

    });
  });

  describe('oneYearAfter', ()=>{
    it('deberia retornar null si date es exactamente un año despues de liberado el producto', ()=>{
      const form =  new FormGroup({
        release: new FormControl('2024-01-01'),
        revision: new FormControl('2025-01-01')
      });

      const validator =  DateValidators.oneYearAfter('release');
      expect(validator(form.get('revision')!)).toBeNull();                                                          
    });

    it('deberia retornae error si date no es exactamente un año despues de liberado el producto', ()=>{
      const form = new FormGroup({
        release: new FormControl('2024-01-01'),
        revision: new FormControl('2024-12-31')
      });
      const validator = DateValidators.oneYearAfter('release');
      expect(validator(form.get('revision')!)).toEqual({invalidRevisionDate: true});
    });

    it('deberia retornar null si no existe fecha de revision o liberacion',() =>{
      const form = new FormGroup({
        release: new FormControl(''),
        revision: new FormControl('')
      });
      
      const validator = DateValidators.oneYearAfter('release');
      const result = validator (form.get('revision')!);

      expect(result).toBeNull();
    });

    it('deberia retornar null si el control parent no existe', () => {

      const control = new FormControl('2025-01-01');
      const validator = DateValidators.oneYearAfter('release');
      const result = validator(control);
      expect(result).toBeNull;
    });
  });
});                                               
