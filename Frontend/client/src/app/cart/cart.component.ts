import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { Observable } from 'rxjs';
import { ICart, ICartTotals,  } from '../shared/interfaces/Cart';
import { CartItem } from '../shared/interfaces/CartItem';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  standalone: false,
  styleUrl: './cart.component.scss'
})
export default class CartComponent implements OnInit {
cart$!: Observable<ICart | null>;
  cartTotal$!: Observable<ICartTotals | null>;
  selectedTotal$!: Observable<number>;
  isLoading = false;
  selectedItems: Set<number> = new Set();
  selectedCount: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cart$ = this.cartService.cart$;
    this.cartTotal$ = this.cartService.cartTotal$;
    this.selectedTotal$ = this.cartService.selectedTotal$;
    
    const cartId = localStorage.getItem('cart_id');
    if (cartId) this.cartService.getCart(cartId).subscribe();
  }

  // Item actions
  increment(item: CartItem) { 
    this.cartService.incrementQuantity(item); 
  }

  decrement(item: CartItem) { 
    this.cartService.decrementQuantity(item); 
  }

  remove(item: CartItem) {
    if (confirm(`Remove "${item.productName}" from cart?`)) {
      this.isLoading = true;
      this.cartService.removeItem(item);
      this.selectedItems.delete(item.id);
      this.isLoading = false;
    }
  }

  toggleItemSelection(itemId: number, items: CartItem[]): void {
    if (this.selectedItems.has(itemId)) {
      this.selectedItems.delete(itemId);
    } else {
      this.selectedItems.add(itemId);
    }
    this.selectedCount = this.selectedItems.size;
    this.cartService.updateSelectedTotal(items, this.selectedItems);
  }

  toggleSelectAll(items: CartItem[]): void {
    if (this.selectedItems.size === items.length) {
      this.selectedItems.clear();
    } else {
      items.forEach(i => this.selectedItems.add(i.id));
    }
    this.selectedCount = this.selectedItems.size;
    this.cartService.updateSelectedTotal(items, this.selectedItems);
  }

  clearAll() {
    if (confirm('Clear entire shopping cart?')) {
      this.isLoading = true;
      const cart = this.cartService.getCurrentCartValue();
      if (cart) {
        this.cartService.setCart({ ...cart, items: [] });
      }
      this.selectedItems.clear();
      this.selectedCount = 0;
      this.isLoading = false;
    }
  }

  proceedToCheckout() {
    if (this.selectedItems.size === 0) {
      alert('Please select items to checkout');
      return;
    }
    console.log('Proceed to checkout:', Array.from(this.selectedItems));
  }

  moveToWishlist(item: CartItem) { 
    console.log('Move to wishlist:', item); 
  }

  isAllSelected(items: CartItem[]): boolean {
    return items.length > 0 && this.selectedItems.size === items.length;
  }

  getItemTotal(item: CartItem): number {
    return item.price * item.quantity;
  }

  getCartItemCount(items: CartItem[]): number {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }
}