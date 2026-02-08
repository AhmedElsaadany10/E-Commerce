import { Component, OnInit, HostListener } from '@angular/core';
import { NavItem } from '../../../shared/interfaces/NavItem';
import { CartService } from '../../../cart/cart.service';
import { Observable } from 'rxjs';
import { ICart } from '../../../shared/interfaces/Cart';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  standalone:false,
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  cartItems$!: Observable<ICart | null>;
  isLoggedIn: boolean = false;
  userInitials: string = 'JD';
  searchQuery: string = '';
  navItems: NavItem[] = [
    { label: 'Home', link: '/', active: true },
    { label: 'Shop', link: '/shop' },
    { label: 'Contact', link: '/contact' },
    { label: 'About', link: '/about' },
    { label: 'Errors', link: '/error' }
  ];

  constructor(private cartService:CartService) { }

  ngOnInit(): void {
    this.cartItems$=this.cartService.cart$;
    // Initialize user state from auth service
    // this.isLoggedIn = this.authService.isLoggedIn();
  }
onSearch(event: Event): void {
  event.preventDefault();
  console.log('بحث عن:', this.searchQuery);
  // You can search here
}

  toggleCart(): void {
    // Implement cart toggle logic
    console.log('Toggle cart');
  }

  login(): void {
    // Navigate to login
    console.log('Navigate to login');
  }

  signUp(): void {
    // Navigate to signup
    console.log('Navigate to signup');
  }

  logout(): void {
    // Implement logout logic
    console.log('Logout');
  }
}