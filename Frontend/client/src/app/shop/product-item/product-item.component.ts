import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../shared/interfaces/Product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  standalone: false,
  styleUrls: ['./product-item.component.scss'] // fixed typo from styleUrl
})
export class ProductItemComponent {
  @Input() product!: Product; // Input from parent component
  @Output() addToCartEvent = new EventEmitter<Product>();
  @Output() addToWishlistEvent = new EventEmitter<Product>();
  @Output() quickViewEvent = new EventEmitter<Product>();

  isInCart: boolean = false;

  // Fallback for broken images
  handleImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/images/placeholder.jpg';
  }

  // Add product to cart
  addToCart(): void {
    this.isInCart = true;
    this.addToCartEvent.emit(this.product);
  }

  // Toggle wishlist (logic to implement)
  toggleWishlist(): void {
    // Here you can implement your wishlist toggle logic
    // Example: this.product.isInWishlist = !this.product.isInWishlist;
    this.addToWishlistEvent.emit(this.product);
  }

  // Quick view modal
  quickView(): void {
    this.quickViewEvent.emit(this.product);
  }

  // Compare product placeholder
  compareProduct(): void {
    console.log('Compare product:', this.product);
  }
}
