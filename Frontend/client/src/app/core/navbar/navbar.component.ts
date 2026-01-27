import { Component, OnInit, HostListener } from '@angular/core';
import { NavItem } from '../../shared/interfaces/NavItem';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  standalone:false,
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  cartItems: number = 3;
  isLoggedIn: boolean = false;
  userInitials: string = 'JD';
  searchQuery: string = '';
  navItems: NavItem[] = [
    { label: 'Home', link: '/', active: true },
    { label: 'Shop', link: '/shop' },
    { label: 'Pricing', link: '/pricing' },
    { label: 'Contact', link: '/contact' },
    { label: 'About', link: '/about' }
  ];

  constructor() { }

  ngOnInit(): void {
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