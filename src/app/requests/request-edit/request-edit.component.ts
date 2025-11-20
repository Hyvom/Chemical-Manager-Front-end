import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from '../../core/request.service';
import { ProductService } from '../../core/product.service';
import { Request } from '../../models/request.model';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-request-edit',
  standalone: true,
  templateUrl: './request-edit.component.html',
  styleUrls: ['./request-edit.component.scss'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class RequestEditComponent implements OnInit {
  requestForm;
  products: Product[] = [];
  isEditMode = false;
  requestId: number | null = null;
  error: string | null = null;
  successMessage: string | null = null;
  selectedProduct: Product | null = null;
  maxQuantity: number = 0;

  constructor(
    private fb: FormBuilder,
    private requestService: RequestService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.requestForm = this.fb.group({
      produitId: [null as number | null, Validators.required],
      quantiteDemandee: [0, [Validators.required, Validators.min(1)]],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      motif: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit() {
    this.loadProducts();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.requestId = +id;
      this.loadRequest(this.requestId);
    }

    const today = new Date().toISOString().split('T')[0];
    this.requestForm.patchValue({
      dateDebut: today,
      dateFin: today
    });
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.products = products.filter(p => p.quantite > 0);
      },
      error: (err) => {
        this.error = 'Failed to load products';
        console.error(err);
      }
    });
  }

  loadRequest(id: number) {
    this.requestService.getRequestById(id).subscribe({
      next: (request) => {
        this.requestForm.patchValue({
          produitId: request.produitId,
          quantiteDemandee: request.quantiteDemandee,
          dateDebut: request.dateDebut,
          dateFin: request.dateFin,
          motif: request.motif
        });
        this.onProductChange();
      },
      error: (err) => {
        this.error = 'Failed to load request';
        console.error(err);
      }
    });
  }

  onProductChange() {
    const produitId = this.requestForm.get('produitId')?.value;
    if (produitId !== null && produitId !== undefined) {
      this.selectedProduct = this.products.find(p => p.id === Number(produitId)) || null;
      if (this.selectedProduct) {
        this.maxQuantity = this.selectedProduct.quantite;
        this.requestForm.get('quantiteDemandee')?.setValidators([
          Validators.required,
          Validators.min(1),
          Validators.max(this.maxQuantity)
        ]);
        this.requestForm.get('quantiteDemandee')?.updateValueAndValidity();
      }
    }
  }

  onSubmit() {
    if (this.requestForm.valid) {
      const formValue = this.requestForm.value;

      const requestData: Request = {
        produitId: Number(formValue.produitId),
        quantiteDemandee: formValue.quantiteDemandee ?? 0,
        dateDebut: formValue.dateDebut ?? '',
        dateFin: formValue.dateFin ?? '',
        motif: formValue.motif ?? ''
      };

      if (this.isEditMode && this.requestId) {
        this.requestService.updateRequest(this.requestId, requestData).subscribe({
          next: () => {
            this.successMessage = 'Request updated successfully!';
            setTimeout(() => this.router.navigate(['/requests']), 1500);
          },
          error: (err) => {
            this.error = err.error?.message || 'Failed to update request';
            console.error(err);
          }
        });
      } else {
        this.requestService.createRequest(requestData).subscribe({
          next: () => {
            this.successMessage = 'Request submitted successfully! Waiting for admin approval.';
            setTimeout(() => this.router.navigate(['/requests']), 2000);
          },
          error: (err) => {
            this.error = err.error?.message || 'Failed to submit request';
            console.error(err);
          }
        });
      }
    }
  }

  onCancel() {
    this.router.navigate(['/requests']);
  }

  getFieldError(fieldName: string): string | null {
    const field = this.requestForm.get(fieldName);
    if (field?.invalid && field?.touched) {
      if (field.errors?.['required']) return `${fieldName} is required`;
      if (field.errors?.['min']) return `Minimum value is ${field.errors['min'].min}`;
      if (field.errors?.['max']) return `Maximum available quantity is ${field.errors['max'].max}`;
      if (field.errors?.['minlength']) return `Minimum length is ${field.errors['minlength'].requiredLength} characters`;
    }
    return null;
  }
}
