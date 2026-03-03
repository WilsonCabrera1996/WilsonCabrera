import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { ProductService } from '../../core/services/product.service';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productService: ProductService;
  let router: Router;

  const mockProductsResponse = {
    data: [
      { 
        id: 'trj-crd', 
        name: 'Visa Gold', 
        description: 'Descripción de más de diez caracteres', 
        logo: 'logo.png', 
        date_release: '2025-01-01', 
        date_revision: '2026-01-01'
      }
    ]
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProductListComponent, 
        HttpClientTestingModule, 
        RouterTestingModule
      ],
      providers: [
        {
          provide: ProductService,
          useValue: {
            
            getProducts: () => of(mockProductsResponse),
            deleteProduct: () => of(null)
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('debe filtrar los productos cuando se llama a onSearch (con debounce)', fakeAsync(() => {
    component.products = mockProductsResponse.data;
    const event = { target: { value: 'Visa' } };
    
    component.onSearch(event);
    
    tick(1000);
    expect(component.filteredProducts.length).toBe(1);
    expect(component.filteredProducts[0].name).toBe('Visa Gold');
  }));

  it('debe navegar al formulario al llamar a onEdit', () => {
    const spy = jest.spyOn(router, 'navigate');
    const product = mockProductsResponse.data[0];
    
    component.onEdit(product);
    
    expect(spy).toHaveBeenCalledWith(['/product-form'], { state: { product } });
  });

  it('debe navegar a agregar producto al llamar a goToAdd', () => {
    const spy = jest.spyOn(router, 'navigate');
    component.goToAdd();
    expect(spy).toHaveBeenCalledWith(['/product-form']);
  });

  it('debe ejecutar deleteProduct con éxito y recargar la lista', () => {
const deleteSpy = jest.spyOn(productService, 'deleteProduct').mockReturnValue(of(undefined) as any);
    const loadSpy = jest.spyOn(component, 'loadProducts');
    
    component.selectedProduct = mockProductsResponse.data[0];
    component.deleteProduct();
    
    expect(deleteSpy).toHaveBeenCalledWith('trj-crd');
    expect(component.showModal).toBeFalsy();
    expect(loadSpy).toHaveBeenCalled();
  });

  it('debe manejar error al eliminar producto', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    jest.spyOn(productService, 'deleteProduct').mockReturnValue(throwError(() => new Error('Error')));
    
    component.selectedProduct = mockProductsResponse.data[0];
    component.deleteProduct();
    
    expect(consoleSpy).toHaveBeenCalledWith('Error al eliminar ', expect.any(Error));
  });

  it('debe alternar el menú (toggleMenu)', () => {
    component.toggleMenu('123');
    expect(component.activeMenuId).toBe('123');
    
    component.toggleMenu('123');
    expect(component.activeMenuId).toBeNull();
  });

  it('debe cambiar el límite y aplicar el filtro', () => {
    const spy = jest.spyOn(component, 'applyLimit');
    const event = { target: { value: '10' } };
    
    component.onLimitChange(event);
    
    expect(component.limit).toBe(10);
    expect(spy).toHaveBeenCalled();
  });
  it('debe manejar error al cargar productos (líneas 43-44)', () => {
  const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
  jest.spyOn(productService, 'getProducts').mockReturnValue(throwError(() => new Error('Error de carga')));
  
  component.loadProducts();
  
  expect(consoleSpy).toHaveBeenCalledWith('Error al cargar productos', expect.any(Error));
});

it('debe abrir el modal de eliminación (líneas 85-87)', () => {
  const product = mockProductsResponse.data[0];
  component.openDeleteModal(product);
  
  expect(component.selectedProduct).toEqual(product);
  expect(component.showModal).toBeTruthy();
});
});