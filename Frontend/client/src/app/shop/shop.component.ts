import { Component, OnInit } from '@angular/core';
import { Product } from '../shared/interfaces/Product';
import { ShopService } from './shop.service';
import { Brand } from '../shared/interfaces/Brand';
import { Category } from '../shared/interfaces/Category';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  standalone: false,
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  // products!:Product[];
  // constructor(private shopService:ShopService){}
  // ngOnInit(): void {
  //   this.shopService.getProducts().subscribe(resp=>{
  //     this.products=resp;
  //   },error=>{
  //     console.log(error);
  //   })
  // }
  products: Product[] = [];
  brands: Brand[] = [];
  categories: Category[] = [];
  filteredProducts: Product[] = [];
  searchTerm: string = '';
  currentSort: string = 'name_asc';
  viewMode: 'grid' | 'list' = 'grid';
  currentPage: number = 1;
  pageSize: number = 12;
  totalPages: number = 1;

  // Filter variables
  selectedCategories: number[] = [];
  selectedBrands: number[] = [];
  selectedMaxPrice: number = 10000;
  maxPrice: number = 10000;
  minPrice: number = 0;
  minRating: number = 0; // for future rating feature
  activeFilters: string[] = [];

  // categoriesList = [
  //   { id: 1, name: 'Electronics', count: 24 },
  //   { id: 2, name: 'Fashion', count: 18 },
  //   { id: 3, name: 'Home & Garden', count: 32 },
  //   { id: 4, name: 'Sports', count: 15 }
  // ];

  sortOptions = [
    { label: 'Name: A-Z', value: 'name_asc', icon: 'bi-sort-alpha-down' },
    { label: 'Name: Z-A', value: 'name_desc', icon: 'bi-sort-alpha-up' },
    { label: 'Price: Low to High', value: 'price_asc', icon: 'bi-sort-numeric-down' },
    { label: 'Price: High to Low', value: 'price_desc', icon: 'bi-sort-numeric-up' }
    // Future options:
    // { label: 'Rating: Highest', value: 'rating_desc', icon: 'bi-star' },
    // { label: 'Newest', value: 'date_desc', icon: 'bi-calendar' }
  ];

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
    this.loadBrands();
   // this.applyFilters();
  }

  // Load products from service
loadProducts(): void {
  this.shopService.getProducts().subscribe(resp => {
    this.products = resp;

    // حساب أقل وأعلى سعر من المنتجات
    if (this.products.length > 0) {
      this.minPrice = Math.min(...this.products.map(p => p.price));
      this.maxPrice = Math.max(...this.products.map(p => p.price));
      this.selectedMaxPrice = this.maxPrice; // يبدأ على أقصى سعر
    }

    this.applyFilters();
    console.log(this.products);
  }, error => {
    console.log(error);
  });
}

  loadBrands(): void {
    this.shopService.getBrands().subscribe(resp=>{
      this.brands=resp;
      console.log(this.brands)
    },error=>{
      console.log(error);
    })
  }
    loadCategories(): void {
    this.shopService.getCategories().subscribe(resp=>{
      this.categories=resp;
      console.log(this.categories)
    },error=>{
      console.log(error);
    })
  }
  onSearchChange(): void {
    this.currentPage = 1;
    this.applyFilters();
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.applyFilters();
  }

  sortProducts(sortBy: string): void {
    this.currentSort = sortBy;
    this.applyFilters();
  }

  getSortLabel(): string {
    const option = this.sortOptions.find(opt => opt.value === this.currentSort);
    return option ? option.label : 'Sort';
  }

  toggleCategory(categoryId: number): void {
    const index = this.selectedCategories.indexOf(categoryId);
    if (index > -1) {
      this.selectedCategories.splice(index, 1);
    } else {
      this.selectedCategories.push(categoryId);
    }
    this.applyFilters();
  }
  
  toggleBrand(brandId: number): void {
    const index = this.selectedBrands.indexOf(brandId);
    if (index > -1) {
      this.selectedBrands.splice(index, 1);
    } else {
      this.selectedBrands.push(brandId);
    }
    this.applyFilters();
  }


  applyPriceFilter(): void {
    this.currentPage = 1;
    this.applyFilters();
  }

  applyRatingFilter(): void {
    this.currentPage = 1;
    this.applyFilters();
  }

  clearAllFilters(): void {
    this.searchTerm = '';
    this.selectedCategories = [];
    this.selectedBrands = [];
      if (this.products.length > 0) {
      this.minPrice = Math.min(...this.products.map(p => p.price));
      this.maxPrice = Math.max(...this.products.map(p => p.price));
    }
    this.currentSort = 'name_asc';
    this.applyFilters();
  }

  applyFilters(): void {
    let filtered = [...this.products];

    // Search filter
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term) ||
        product.brand.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term)
      );
    }

    // Category filter
    if (this.selectedCategories.length > 0) {
      filtered = filtered.filter(product =>
        this.selectedCategories.includes(this.categories.find(c => c.name === product.category)?.id!)
      );
    }
  // Brand filter
    if (this.selectedBrands.length > 0) {
      filtered = filtered.filter(product =>
        this.selectedBrands.includes(this.brands.find(c => c.name === product.brand)?.id!)
      );
    }
  // Price filter
  filtered = filtered.filter(product => product.price <= this.selectedMaxPrice);

    // Future: Rating filter (currently ignored)
    if (this.minRating > 0) {
      // filtered = filtered.filter(product => product.rating >= this.minRating);
    }

    // Sort
    filtered = this.sortProductsList(filtered);

    // Update active filters display
    this.updateActiveFilters();

    // Pagination
    this.totalPages = Math.ceil(filtered.length / this.pageSize);
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.filteredProducts = filtered.slice(startIndex, startIndex + this.pageSize);
  }

  sortProductsList(products: Product[]): Product[] {
    switch (this.currentSort) {
      case 'name_asc':
        return [...products].sort((a, b) => a.name.localeCompare(b.name));
      case 'name_desc':
        return [...products].sort((a, b) => b.name.localeCompare(a.name));
      case 'price_asc':
        return [...products].sort((a, b) => a.price - b.price);
      case 'price_desc':
        return [...products].sort((a, b) => b.price - a.price);
      default:
        return products;
    }
  }

  updateActiveFilters(): void {
    this.activeFilters = [];
    if (this.searchTerm) this.activeFilters.push(`Search: "${this.searchTerm}"`);
    if (this.selectedCategories.length > 0) {
      const categoryNames = this.selectedCategories.map(id =>
        this.categories.find(c => c.id === id)?.name
      ).filter(Boolean).join(', ');
      this.activeFilters.push(`Categories: ${categoryNames}`);
    }
    if (this.selectedBrands.length > 0) {
      const brandNames = this.selectedBrands.map(id =>
        this.brands.find(c => c.id === id)?.name
      ).filter(Boolean).join(', ');
      this.activeFilters.push(`brands: ${brandNames}`);
    }
    if (this.maxPrice < 5000) this.activeFilters.push(`Max Price: $${this.maxPrice}`);
    if (this.minRating > 0) this.activeFilters.push(`Min Rating: ${this.minRating} stars`);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.applyFilters();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  getPages(): number[] {
    const pages: number[] = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, this.currentPage - 2);
    let endPage = Math.min(this.totalPages, startPage + maxPagesToShow - 1);
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    for (let i = startPage; i <= endPage; i++) pages.push(i);
    return pages;
  }

  // Event handlers for future features
  onAddToCart(product: Product): void {
    console.log('Add to cart:', product);
  }

  onAddToWishlist(product: Product): void {
    console.log('Add to wishlist:', product);
  }

  onQuickView(product: Product): void {
    console.log('Quick view:', product);
  }
  handleImageError(event: any) {
  event.target.src = 'assets/images/placeholder.png'; 
}

}
