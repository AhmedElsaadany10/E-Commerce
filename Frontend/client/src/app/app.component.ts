import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from './shared/interfaces/Product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'E-Commerce';

  constructor(private http:HttpClient){}
  ngOnInit(): void {
  }
}
