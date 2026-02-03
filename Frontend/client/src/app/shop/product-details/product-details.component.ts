import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/interfaces/Product';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopService } from '../shop.service';
import { BreadcrumbService } from 'xng-breadcrumb';

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
  relatedProducts: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private shopService: ShopService,
    private bcService: BreadcrumbService
  ) {}

  ngOnInit(): void {
    this.loadProduct();
    this.bcService.set('@productDetails', this.product.name);

  }

  private loadProduct(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.shopService.getProduct(id).subscribe({
      next: (res) => {
        this.product = res;
        this.processProductImages();
        this.loadRelatedProducts();
      },
      error: (error) => {
        console.error('Product not found:', error);
        this.router.navigate(['/shop']);
      }
    });
  }

  private processProductImages(): void {
    const images = this.product.productImages || [];
    this.product.imageUrl = this.product.imageUrl || 'assets/images/placeholder.png';
    // Add main image if not already in the array
    if (!images.includes(this.product.imageUrl)) {
      this.product.productImages = [this.product.imageUrl, ...images];
    } else {
      this.product.productImages = images;
    }
    
    // Set initial selected image
    this.selectedImage = this.product.productImages[0];
    this.currentImageIndex = 0;
  }

  private loadRelatedProducts(): void {
    // Load related products based on category
    // this.shopService.getProductsByCategory(this.product.category).subscribe({
    //   next: (products) => {
    //     // Filter out current product and limit to 4 items
    //     this.relatedProducts = products
    //       .filter(p => p.id !== this.product.id)
    //       .slice(0, 4);
    //   },
    //   error: (error) => {
    //     console.error('Failed to load related products:', error);
    //   }
    // });
  }

  changeImage(img: string, index?: number): void {
    this.selectedImage = img;
    if (index !== undefined) {
      this.currentImageIndex = index;
    }
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

  increaseQuantity(): void {
    if (this.quantity < this.product.quantity) {
      this.quantity++;
    }
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  validateQuantity(): void {
    if (this.quantity < 1) {
      this.quantity = 1;
    }
    if (this.quantity > this.product.quantity) {
      this.quantity = this.product.quantity;
    }
  }

  addToCart(): void {
    if (this.product.quantity === 0) return;
    
    this.isAddingToCart = true;
    
    // Simulate API call
    setTimeout(() => {
      console.log('Added to cart:', {
        ...this.product,
        quantity: this.quantity,
        totalPrice: this.product.price * this.quantity
      });
      
      // Show success message (you can implement a toast service)
      alert(`${this.product.name} added to cart!`);
      
      this.isAddingToCart = false;
    }, 1000);
  }

  toggleWishlist(): void {
    this.product.isInWishlist = !this.product.isInWishlist;
    const message = this.product.isInWishlist 
      ? 'Added to wishlist!' 
      : 'Removed from wishlist';
    
    // Show feedback
    console.log(message);
    
    // You can implement wishlist service here
    // this.wishlistService.toggleWishlist(this.product.id);
  }

  compareProduct(): void {
    console.log('Compare product:', this.product);
    // Implement comparison logic
  }

  shareProduct(): void {
    if (navigator.share) {
      navigator.share({
        title: this.product.name,
        text: this.product.description,
        url: window.location.href
      });
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href)
        .then(() => alert('Link copied to clipboard!'))
        .catch(() => alert('Failed to copy link'));
    }
  }


}