import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController} from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { Product } from '../models/product.model';


describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;
  const API_URL= 'http://localhost:3002/bp/products';

  const mockProduct: Product = {
    id:'trj-crd',
    name: 'Tarjetas de Crédito',
    description: 'Tarjeta de consumo bajo la modalidad de Crédito',
    logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
    date_release: '2023-02-01',
    date_revision: '2024-02-01'
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [
        ProductService,
        provideHttpClient(),        
        provideHttpClientTesting() 
      ]
    });
  
      service = TestBed.inject(ProductService);
      httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(()=>{
    httpMock.verify();
  });

  it('crear', () => {
    expect(service).toBeTruthy();
  });

  it('Obtener lista de productos', () => {
    service.getProducts().subscribe(products => {
      expect(products.length).toBe(1);
      expect(products[0]).toEqual(mockProduct);
    });

    const req = httpMock.expectOne(API_URL);
    expect(req.request.method).toBe('GET');
    req.flush([mockProduct]);
  });

  it('Verificar si un ID existe', () => {
    service.verifyIDExists('trj-crd').subscribe(exists => {
      expect(exists).toBe(true);
    });

    const req = httpMock.expectOne(`${API_URL}/verification/trj-crd`);
    expect(req.request.method).toBe('GET');
    req.flush(true);
  });

  it('Enviar un nuevo producto', () => {
    service.createProduct(mockProduct).subscribe(product =>{
      expect(product).toEqual(mockProduct);
    });

    const req = httpMock.expectOne(API_URL);
    expect(req.request.method).toBe('POST');
    req.flush(mockProduct);
  });

  it('Actualizar un producto', () => {
    service.updateProduct(mockProduct).subscribe(product =>{
      expect(product).toEqual(mockProduct);
    });

    const req = httpMock.expectOne(`${API_URL}/${mockProduct.id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockProduct);
  });

  it('Eliminar un producto', () => {
    service.deleteProduct('trj-crd').subscribe();

    const req = httpMock.expectOne(`${API_URL}/trj-crd`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
