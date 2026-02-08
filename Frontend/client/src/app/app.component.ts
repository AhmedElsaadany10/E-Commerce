import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from './shared/interfaces/Product';
import { CartService } from './cart/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'E-Commerce';

  constructor(private http:HttpClient,private cartService:CartService){}
  ngOnInit(): void {
    const cartId=localStorage.getItem('cart_id');
    if(cartId){
      this.cartService.getCart(cartId);
    }
  }
}
