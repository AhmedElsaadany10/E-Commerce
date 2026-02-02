import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../shared/interfaces/Product';
import { Category } from '../shared/interfaces/Category';
import { Brand } from '../shared/interfaces/Brand';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
//baseUrl='https://localhost:7070/api/';
baseUrl='http://localhost:5053/api/';
  constructor(private http:HttpClient) { }

  getProducts(){
    return this.http.get<Product[]>(this.baseUrl+'products');
  }
    getProduct(id:number){
    return this.http.get<Product >(this.baseUrl+'product/'+id);
  }
    getCategories(){
    return this.http.get<Category[]>(this.baseUrl+'categories');
  } 
   getBrands(){
    return this.http.get<Brand[]>(this.baseUrl+'brands');
  }
}
