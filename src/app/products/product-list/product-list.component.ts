import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../core/product.service';
import { AuthService } from '../../core/auth.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  imports: [CommonModule, RouterLink, FormsModule]
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchKeyword: string = '';
  isAdmin: boolean = false;
  loading: boolean = false;
  error: string | null = null;

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkUserRole();
    this.loadProducts();
  }

  checkUserRole(): void {
    const role = this.authService.getRole();
    this.isAdmin = role === 'ROLE_ADMIN';
  }

  loadProducts(): void {
    this.loading = true;
    this.error = null;
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.filteredProducts = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load products';
        this.loading = false;
        console.error('Error loading products:', err);
      }
    });
  }

  searchProducts(): void {
    if (this.searchKeyword.trim() === '') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(product =>
        product.nom.toLowerCase().includes(this.searchKeyword.toLowerCase()) ||
        product.formule.toLowerCase().includes(this.searchKeyword.toLowerCase()) ||
        product.categorie.toLowerCase().includes(this.searchKeyword.toLowerCase())
      );
    }
  }

  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.loadProducts();
        },
        error: (err) => {
          this.error = 'Failed to delete product';
          console.error('Error deleting product:', err);
        }
      });
    }
  }

  viewProduct(id: number): void {
    this.router.navigate(['/products/detail', id]);
  }

  editProduct(id: number): void {
    this.router.navigate(['/products/edit', id]);
  }

  addProduct(): void {
    this.router.navigate(['/products/add']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
