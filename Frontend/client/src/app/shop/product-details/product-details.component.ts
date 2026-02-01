import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/interfaces/Product';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  standalone:false,
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {

   product!: Product;
  selectedImage!: string;

  constructor(
    private route: ActivatedRoute,
    private shopService: ShopService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.shopService.getProduct(id).subscribe({
      next: (res) => {
        this.product = res;

        const images = this.product.productImages || [];
        // لو imageUrl موجودة → ما نكررهاش
      this.product.productImages = images.includes(this.product.imageUrl)
        ? images
        : [this.product.imageUrl, ...images];
       // الصورة الأساسية
      this.selectedImage = this.product.productImages[0];
        //  this.selectedImage =
        // res.productImages?.length > 0
        //   ? res.productImages[0]
        //   : res.imageUrl;
      },
      error: () => {
        console.log('Product not found');
      }
    });
  }
  changeImage(img: string) {
  this.selectedImage = img;
}
  addToCart() {
    console.log('Add to cart', this.product);
  }

  toggleWishlist() {
    console.log('Wishlist');
  }

  compareProduct() {
    console.log('Compare');
  }
  handleImageError(event: any) {
    event.target.src = 'assets/images/placeholder.jpg';
  }
}