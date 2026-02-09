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
  currentImageIndex: number = 0;

  quantity: number = 0;
  existingCartItem: CartItem | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private shopService: ShopService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadProduct();
  }

  private loadProduct(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.shopService.getProduct(id).subscribe({
      next: (res) => {
        this.product = res;
        this.processProductImages();
        this.syncWithCart();
      },
      error: () => this.router.navigate(['/shop'])
    });
  }

  private syncWithCart(): void {
    if (!this.product) return;

    const cartItem = this.cartService.getCurrentCartValue()?.items.find(i => i.id === this.product.id) || null;
    this.existingCartItem = cartItem;
    this.quantity = cartItem ? cartItem.quantity : 0;
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

  // Quantity Methods
  increaseQuantity(): void {
    if (!this.product) return;

    if (this.existingCartItem) {
      this.cartService.incrementQuantity(this.existingCartItem);
    } else {
      this.cartService.addItemToCart(this.product, 1);
    }

    this.syncWithCart();
  }

  decreaseQuantity(): void {
    if (!this.product || this.quantity === 0) return;

    if (this.existingCartItem) {
      this.cartService.decrementQuantity(this.existingCartItem);
    } else if (this.quantity > 0) {
      this.quantity--;
    }

    this.syncWithCart();
  }

  removeFromCart(): void {
    if (!this.existingCartItem) return;

    this.cartService.removeItem(this.existingCartItem);
    this.existingCartItem = null;
    this.quantity = 0;
  }

  // Stock & UI helpers
  get isOutOfStock(): boolean {
    return this.product.countInStock === 0;
  }

  get isStockLow(): boolean {
    return this.product?.countInStock <= 5 && this.product?.countInStock > 0;
  }

  get totalPrice(): number {
    return this.product.price * this.quantity;
  }

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