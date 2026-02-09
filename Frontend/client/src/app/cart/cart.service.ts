import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { Cart, ICart, ICartTotals } from '../shared/interfaces/Cart';
import { Product } from '../shared/interfaces/Product';
import { CartItem } from '../shared/interfaces/CartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  baseUrl = 'http://localhost:5053/api/';

  private cartSource = new BehaviorSubject<ICart | null>(null);
  cart$ = this.cartSource.asObservable();

  private cartTotalSource = new BehaviorSubject<ICartTotals | null>(null);
  cartTotal$ = this.cartTotalSource.asObservable();

  // <<< تم اعادة هذه الخاصية >>> 
  private selectedTotalSource = new BehaviorSubject<number>(0);
  selectedTotal$ = this.selectedTotalSource.asObservable();

  constructor(private http: HttpClient) {
    const cartId = localStorage.getItem('cart_id');
    if (cartId) {
      this.getCart(cartId).subscribe();
    }
  }

  getCart(id: string) {
    return this.http.get<ICart>(`${this.baseUrl}cart?id=${id}`)
      .pipe(
        tap(cart => {
          this.cartSource.next(cart);
          this.calculateTotals();
        })
      );
  }

  setCart(cart: ICart) {
    return this.http.post<ICart>(`${this.baseUrl}cart`, cart)
      .subscribe({
        next: (resp: ICart) => {
          this.cartSource.next(resp);
          this.calculateTotals();
        },
        error: (err) => console.log(err)
      });
  }

  getCurrentCartValue() {
    return this.cartSource.value;
  }

  addItemToCart(product: Product, quantity = 1) {
    if (product.countInStock < quantity) {
      alert('الكمية المطلوبة غير متاحة');
      return;
    }

    const addItem: CartItem = this.mapProductItemToCartItem(product, quantity);
    const cart = this.getCurrentCartValue() ?? this.addCart();

    const existingItem = cart.items.find(x => x.id === product.id);

    if (existingItem) {
      if (existingItem.quantity + quantity > product.countInStock) {
        alert('الكمية المطلوبة أكبر من المتاح');
        return;
      }
      existingItem.quantity += quantity;
    } else {
      addItem.quantity = quantity;
      cart.items.push(addItem);
    }

    this.setCart(cart);
  }

  private addCart(): ICart {
    const cart = new Cart();
    localStorage.setItem('cart_id', cart.id);
    return cart;
  }

  private mapProductItemToCartItem(item: Product, quantity: number): CartItem {
    return {
      id: item.id,
      productName: item.name,
      price: item.price,
      quantity,
      imageUrl: item.imageUrl,
      brand: item.brand,
      category: item.category
    };
  }

  removeItem(item: CartItem): void {
    const cart = this.getCurrentCartValue();
    if (!cart) return;

    cart.items = cart.items.filter(i => i.id !== item.id);

    if (cart.items.length > 0) {
      this.setCart(cart);
    } else {
      this.deleteCart(cart);
    }
  }

  deleteCart(cart: ICart): void {
    if (!cart || !cart.id) return;

    this.http.delete(`${this.baseUrl}cart?id=${cart.id}`).subscribe({
      next: () => {
        this.cartSource.next(null);
        this.cartTotalSource.next(null);
        this.selectedTotalSource.next(0); // <<< إعادة تعيين selectedTotal$ عند مسح السلة
        localStorage.removeItem('cart_id');
      },
      error: (err) => console.error('Error deleting cart:', err)
    });
  }

  incrementQuantity(item: CartItem): void {
    const cart = this.getCurrentCartValue();
    if (!cart) return;

    const foundItem = cart.items.find(x => x.id === item.id);
    if (!foundItem) return;

    foundItem.quantity++;
    this.setCart(cart);
  }

  decrementQuantity(item: CartItem): void {
    const cart = this.getCurrentCartValue();
    if (!cart) return;

    const foundItem = cart.items.find(x => x.id === item.id);
    if (!foundItem) return;

    if (foundItem.quantity > 1) {
      foundItem.quantity--;
      this.setCart(cart);
    } else {
      this.removeItem(item);
    }
  }

  calculateTotals() {
    const cart = this.getCurrentCartValue();
    const subTotal = cart?.items.reduce((a, b) => a + b.price * b.quantity, 0) ?? 0;
    const shipping = 0;
    const total = subTotal + shipping;

    this.cartTotalSource.next({ subTotal, shipping, total });
  }

  // <<< تم اعادة هذه الدوال >>>
  updateSelectedTotal(items: CartItem[], selectedItems: Set<number>) {
    const total = items
      .filter(i => selectedItems.has(i.id))
      .reduce((sum, i) => sum + i.price * i.quantity, 0);
    this.selectedTotalSource.next(total);
  }
}
