import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models/product.model';
import { state } from '@angular/animations';
import { ConfirmModalComponent } from '../../shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ConfirmModalComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{
  products: Product[] = []; 
  filteredProducts: Product[] = [];
  isLoading = false;
  activeMenuId: string | null = null;
  showModal = false;
  selectedProduct: Product | null = null;
  limit = 5;

  constructor(
    private productService: ProductService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
  this.productService.getProducts().subscribe({
    next: (response: any) => { 
      this.products = response.data || []; 
      this.applyLimit();
      this.isLoading = false;
    },
    error: (err) =>{
      console.error('Error al cargar productos', err);
      this.isLoading = false;
    } 
    
  });
}
  onSearch(event: any): void {
    this.isLoading = true;
  const searchTerm = event.target.value.toLowerCase();

  setTimeout(() => {
    this.filteredProducts = this.products.filter(p => 
      p.name.toLowerCase().includes(searchTerm) || 
      p.description.toLowerCase().includes(searchTerm)
    ).slice(0, this.limit);
    
    this.isLoading = false; 
  }, 1000);
}

  onLimitChange(event: any): void{
    this.limit = Number(event.target.value);
    this.applyLimit();
  }

  applyLimit(): void{
    this.filteredProducts = this.products.slice(0, this.limit);
  }

  toggleMenu(id: string):void {
    this.activeMenuId = this.activeMenuId === id ? null: id;
  }

  goToAdd(): void{
    this.router.navigate(['/product-form']);
  }

  onEdit(product: Product): void{
    this.router.navigate(['/product-form'], {state: {product}});
  }

  openDeleteModal(product: Product):void{
    this.selectedProduct = product;
    this.showModal = true;
    this.activeMenuId = null;
  }

  deleteProduct():void{
    if(this.selectedProduct){
      this.productService.deleteProduct(this.selectedProduct.id).subscribe({
        next: () => {
          this.showModal = false;
          this.loadProducts();
        },
        error: (err) => console.error('Error al eliminar ', err)
      })
    }
  }
}
