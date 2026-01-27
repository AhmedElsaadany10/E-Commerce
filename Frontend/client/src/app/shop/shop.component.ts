import { Component, OnInit } from '@angular/core';
import { Product } from '../shared/interfaces/Product';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  standalone: false,
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit {
  products:Product[]=[];
  constructor(private shopService:ShopService){}
  ngOnInit(): void {
    this.shopService.getProducts().subscribe(resp=>{
      this.products=resp;
    },error=>{
      console.log(error);
    })
  }

}
