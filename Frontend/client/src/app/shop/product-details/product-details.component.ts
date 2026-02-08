import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/interfaces/Product';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopService } from '../shop.service';
import { BreadcrumbService } from 'xng-breadcrumb';
import { CartService } from '../../cart/cart.service';
import { CartItem } from '../../shared/interfaces/CartItem';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  standalone:false,
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
   product!: Product;
  selectedImage!: string;
  quantity: number = 1;
  isAddingToCart: boolean = false;
  currentImageIndex: number = 0;
  
  // Cart data
  existingCartItem: CartItem | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private shopService: ShopService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadProduct();
    this.checkCartStatus();
  }

  private loadProduct(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.shopService.getProduct(id).subscribe({
      next: (res) => {
        this.product = res;
        this.processProductImages();
        this.checkCartStatus();
      },
      error: () => {
        this.router.navigate(['/shop']);
      }
    });
  }

  private checkCartStatus(): void {
    const cart = this.cartService.getCurrentCartValue();
    if (cart && this.product) {
      this.existingCartItem = cart.items.find(item => item.id === this.product.id) || null;
      if (this.existingCartItem) {
        this.quantity = this.existingCartItem.quantity;
      }
    }
  }

  private processProductImages(): void {
    const images = this.product.productImages || [];
    
    if (!images.includes(this.product.imageUrl)) {
      this.product.productImages = [this.product.imageUrl, ...images];
    } else {
      this.product.productImages = images;
    }
    
    this.selectedImage = this.product.productImages[0] || this.product.imageUrl;
    this.currentImageIndex = 0;
  }

  // Image Methods
  changeImage(img: string, index?: number): void {
    this.selectedImage = img;
    if (index !== undefined) this.currentImageIndex = index;
  }

  nextImage(): void {
    if (!this.product.productImages || this.product.productImages.length <= 1) return;
    
    this.currentImageIndex = (this.currentImageIndex + 1) % this.product.productImages.length;
    this.selectedImage = this.product.productImages[this.currentImageIndex];
  }

  prevImage(): void {
    if (!this.product.productImages || this.product.productImages.length <= 1) return;
    
    this.currentImageIndex = (this.currentImageIndex - 1 + this.product.productImages.length) % this.product.productImages.length;
    this.selectedImage = this.product.productImages[this.currentImageIndex];
  }

  // QUANTITY METHODS - NO VALIDATION, JUST CALL SERVICE
  increaseQuantity(): void {
    if (this.existingCartItem) {
      // Use cart service - it handles all validation
      this.cartService.incrementQuantity(this.existingCartItem);
    } else {
      // Just increase local quantity
      this.quantity++;
    }
  }

  decreaseQuantity(): void {
    if (this.existingCartItem) {
      // Use cart service - it handles all validation (including removal if needed)
      this.cartService.decrementQuantity(this.existingCartItem);
    } else {
      // Just decrease local quantity
      if (this.quantity > 1) this.quantity--;
    }
  }

  validateQuantity(): void {
    // Basic UI validation only
    if (this.quantity < 1) this.quantity = 1;
  }

  // CART METHODS - NO VALIDATION, JUST CALL SERVICE
  addToCart(): void {
    if (this.isAddingToCart) return;

    this.isAddingToCart = true;

    // Cart service handles ALL validation (stock, etc.)
    this.cartService.addItemToCart(this.product, this.quantity);

    setTimeout(() => {
      this.isAddingToCart = false;
      this.checkCartStatus();
    }, 500);
  }

  removeFromCart(): void {
    if (this.existingCartItem) {
      // Cart service handles everything
      this.cartService.removeItem(this.existingCartItem);
      this.quantity = 1;
    }
  }

  // Helper Methods
  get cartButtonText(): string {
    return this.existingCartItem ? 'Update Cart' : 'Add to Cart';
  }

  get totalPrice(): number {
    return this.product.price * this.quantity;
  }

  get isStockLow(): boolean {
    return this.product.countInStock <= 5 && this.product.countInStock > 0;
  }

  get isOutOfStock(): boolean {
    return this.product.countInStock === 0;
  }

  // Other Actions
  toggleWishlist(): void {
    this.product.isInWishlist = !this.product.isInWishlist;
  }

  compareProduct(): void {
    console.log('Compare product:', this.product);
  }

  shareProduct(): void {
    if (navigator.share) {
      navigator.share({
        title: this.product.name,
        text: this.product.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href)
        .then(() => console.log('Link copied'))
        .catch(() => console.log('Failed to copy'));
    }
  }
}