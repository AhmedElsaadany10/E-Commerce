import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import CartComponent from './cart.component';
import { CartRoutingModule } from './cart-routing.module';
import { FormsModule } from "@angular/forms";
import { OrderTotalsComponent } from './order-totals/order-totals.component';



@NgModule({
  declarations: [CartComponent,OrderTotalsComponent],
  imports: [
    CommonModule,
    CartRoutingModule,
    FormsModule,
],

})
export class CartModule { }
