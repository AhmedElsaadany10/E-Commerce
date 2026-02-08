import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Product } from '../../shared/interfaces/Product';
import { CartService } from '../../cart/cart.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  standalone: false,
  styleUrls: ['./product-item.component.scss'] // fixed typo from styleUrl
})
export class ProductItemComponent implements OnInit{
 
  @Input() product!: Product; // Input from parent component
  @Output() addToCartEvent = new EventEmitter<Product>();
  @Output() addToWishlistEvent = new EventEmitter<Product>();
  @Output() quickViewEvent = new EventEmitter<Product>();

  isInCart: boolean = false;

  constructor(private cartService:CartService){}
  // Fallback for broken images
   ngOnInit(): void {
this.cartService.cart$.subscribe(cart => {
    this.isInCart = !!cart?.items.find(i => i.id === this.product.id);
  });
  }

  // Add product to cart
  addToCart(): void {
    console.log('Total Quantity',this.product.countInStock)
    //this.addToCartEvent.emit(this.product);
    this.cartService.addItemToCart(this.product)

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
