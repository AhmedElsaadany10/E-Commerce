import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../shared/interfaces/Product';

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
}
