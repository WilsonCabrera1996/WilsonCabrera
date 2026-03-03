import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductFormComponent } from './product-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing'; 
import { ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../core/services/product.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs'; // <-- Importamos throwError correctamente aquí

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;
  let productService: ProductService;
  let router: Router;

  const mockProduct = { 
    id: 'trj-crd', 
    name: 'Tarjeta de Crédito', 
    description: 'Descripción válida de más de diez caracteres', 
    logo: 'logo.png', 
    date_release: '2025-01-01', 
    date_revision: '2026-01-01' 
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProductFormComponent, 
        HttpClientTestingModule, 
        ReactiveFormsModule
      ],
      providers: [
        {
          provide: ProductService,
          useValue: {
            verifyIDExists: () => of(false), 
            createProduct: () => of(mockProduct),
            updateProduct: () => of(mockProduct)
          }
        }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('debe llamar a createProduct en onSubmit si el formulario es válido', async () => {
    const spy = jest.spyOn(productService, 'createProduct').mockReturnValue(of(mockProduct));
    const navigateSpy = jest.spyOn(router, 'navigate');

    // Fechas dinámicas para que el dateValidator no falle (estamos en 2026)
    const hoy = new Date().toISOString().split('T')[0];
    const unAnioDespues = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0];
    
    component.productForm.patchValue({
      id: 'new-id',
      name: 'Nuevo Producto',
      description: 'Descripción válida de producto larga',
      logo: 'logo.png',
      date_release: hoy,
      date_revision: unAnioDespues
    });

    fixture.detectChanges();
    await fixture.whenStable(); // Esperamos al validador de ID
    fixture.detectChanges();

    component.onSubmit();

    expect(spy).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });

 it('debe manejar error del servidor al guardar (líneas 60-67)', async () => {
    // 1. Preparamos el espía del console.error
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    
    // 2. Forzamos que el servicio devuelva un error
    jest.spyOn(productService, 'createProduct').mockReturnValue(throwError(() => new Error('Server Error')));

    // 3. Fechas correctas: Revisión debe ser +1 año exacto para que el form sea VÁLIDO
    const hoyDate = new Date();
    const hoy = hoyDate.toISOString().split('T')[0];
    const unAnioDespues = new Date(hoyDate.setFullYear(hoyDate.getFullYear() + 1)).toISOString().split('T')[0];

    component.productForm.patchValue({
      id: 'abc-123', 
      name: 'Nombre Válido', 
      description: 'Descripción larga válida de más de diez',
      logo: 'logo.png', 
      date_release: hoy, 
      date_revision: unAnioDespues 
    });

    // 4. Procesar validadores asíncronos
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    // 5. Ejecutar
    component.onSubmit();
    
    // 6. Ahora sí, el form es válido y llegará al bloque catch del subscribe
    expect(consoleSpy).toHaveBeenCalledWith('Error al procesar el producto', expect.any(Error));
    
    consoleSpy.mockRestore(); // Limpiamos el espía
  });

  it('debe marcar todos los campos como touched si el formulario es inválido', () => {
    const spy = jest.spyOn(component.productForm, 'markAllAsTouched');
    component.onSubmit();
    expect(spy).toHaveBeenCalled();
  });

  it('debe iniciar en modo edición si hay un producto en el estado', () => {
    jest.spyOn(router, 'getCurrentNavigation').mockReturnValue({
      extras: { state: { product: mockProduct } }
    } as any);
    const editFixture = TestBed.createComponent(ProductFormComponent);
    const editComponent = editFixture.componentInstance;
    expect(editComponent.isEditMode).toBeTruthy();
  });
});