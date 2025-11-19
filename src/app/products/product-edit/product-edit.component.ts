import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../core/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class ProductEditComponent implements OnInit {
  productForm;
  isEditMode = false;
  productId: number | null = null;
  error: string | null = null;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {
      this.productForm = this.fb.group({
        nom: ['', Validators.required],
        formule: ['', Validators.required],
        categorie: ['', Validators.required],
        quantite: [0, [Validators.required, Validators.min(0)]],
        unite: ['', Validators.required],
        datePeremption: [''],
        localisation: [''],
        dangereux: [false],
        description: [''],
        etat: ['', Validators.required],           // Add this
        prixUnitaire: [0, [Validators.required, Validators.min(0)]], // Add this
        fournisseur: ['', Validators.required]     // Add this
      });
  }

  ngOnInit() {
    // Check if we're in edit mode by looking for an ID in the route
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.productId = +id;
      this.loadProduct(this.productId);
    }
  }

  loadProduct(id: number) {
    this.productService.getProductById(id).subscribe({
      next: (product) => {
        this.productForm.patchValue(product);
      },
      error: (err) => {
        this.error = 'Failed to load product';
        console.error(err);
      }
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      const productData = this.productForm.value as Product;

      if (this.isEditMode && this.productId) {
        // Update existing product
        this.productService.updateProduct(this.productId, productData).subscribe({
          next: () => {
            this.successMessage = 'Product updated successfully!';
            setTimeout(() => this.router.navigate(['/admin']), 1500);
          },
          error: (err) => {
            this.error = err.error?.message || 'Failed to update product';
            console.error(err);
          }
        });
      } else {
        // Create new product
        this.productService.createProduct(productData).subscribe({
          next: () => {
            this.successMessage = 'Product added successfully!';
            setTimeout(() => this.router.navigate(['/admin']), 1500);
          },
          error: (err) => {
            this.error = err.error?.message || 'Failed to add product';
            console.error(err);
          }
        });
      }
    }
  }

  onCancel() {
    this.router.navigate(['/admin']);
  }
}
