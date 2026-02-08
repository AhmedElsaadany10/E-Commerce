import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Observable } from 'rxjs';
import { ICartTotals } from '../../shared/interfaces/Cart';

@Component({
  selector: 'app-order-totals',
  templateUrl: './order-totals.component.html',
  standalone: false,
  styleUrl: './order-totals.component.scss'
})
export class OrderTotalsComponent implements OnInit {
  cartTotal$!: Observable<ICartTotals | null>;
  selectedTotal$!: Observable<number>;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartTotal$ = this.cartService.cartTotal$;
      this.selectedTotal$ = this.cartService.selectedTotal$;

  }
}