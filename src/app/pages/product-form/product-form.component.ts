import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { dateValidator, oneYearAfterValidator } from '../../core/validators/date.validator';
import { IdExistsValidator } from '../../core/validators/id-exists.validator';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnInit{
  productForm!: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router
  ){
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as {product: any}
    if(state && state.product){
      this.isEditMode = true;
      this.initForm(state.product);
    }else{
      this.initForm();
    }
  }
  
  ngOnInit(): void {
    
  }

  initForm(product?: any): void{
    this.productForm = this.fb.group({
      id: [
        {value: product?.id || '', disabled: this.isEditMode},
        [Validators.required, Validators.minLength(3), Validators.maxLength(10)],
        this.isEditMode ? [] : [IdExistsValidator(this.productService)]
      ],
      name: [product?.name || '', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      description: [product?.description || '', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      logo: [product?.logo || '', Validators.required],
      date_release: [product?.date_release?.split('T')[0] || '', [Validators.required, dateValidator]],
      date_revision: [product?.date_revision?.split('T')[0] || '', [Validators.required, oneYearAfterValidator('date_release')] ]
    });
  }

  onSubmit(): void{
    if(this.productForm.invalid){
      this.productForm.markAllAsTouched();
      return;
    }

    const productData = this.productForm.getRawValue();

    const request = this.isEditMode
    ? this.productService.updateProduct(productData): this.productService.createProduct(productData);

    request.subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => console.error('Error al procesar el producto', err)
    });
  }
}
