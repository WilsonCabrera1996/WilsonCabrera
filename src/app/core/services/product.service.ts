import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly API_URL='http://localhost:3002/bp/products';

  constructor(private http:HttpClient) {}

    getProducts(): Observable<Product[]>{
      return this.http.get<Product[]>(this.API_URL);
    }

    verifyIDExists(id: string): Observable<boolean>{
      return this.http.get<boolean>(`${this.API_URL}/verification/${id}`);
    }

    createProduct(product: Product): Observable<Product>{
      return this.http.post<Product>(this.API_URL, product);
    }

    updateProduct(product: Product): Observable<Product>{
      return this.http.put<Product>(`${this.API_URL}/${product.id}`, product);
    }

    deleteProduct(id: string): Observable<void>{
      return this.http.delete<void>(`${this.API_URL}/${id}`);
    }
   
}
