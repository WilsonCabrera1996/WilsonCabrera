import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmModalComponent } from './confirm-modal.component';

describe('ConfirmModalComponent', () => {
  let component: ConfirmModalComponent;
  let fixture: ComponentFixture<ConfirmModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmModalComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe emitir el evento "confirm" al hacer clic en el botón de confirmar', () => {
    jest.spyOn(component.confirm, 'emit');
    const btn = fixture.nativeElement.querySelector('.btn-confirm');
    btn.click();
    expect(component.confirm.emit).toHaveBeenCalled();
  });

  it('debe emitir el evento "cancel" al hacer clic en el botón de cancelar', () => {
    jest.spyOn(component.cancel, 'emit');
    const btn = fixture.nativeElement.querySelector('.btn-cancel');
    btn.click();
    expect(component.cancel.emit).toHaveBeenCalled();
  });

  it('debe mostrar el nombre del producto recibido por Input', () => {
    component.productName = 'Producto Test';
    fixture.detectChanges();
    const p = fixture.nativeElement.querySelector('p');
    expect(p.textContent).toContain('Producto Test');
  });
});