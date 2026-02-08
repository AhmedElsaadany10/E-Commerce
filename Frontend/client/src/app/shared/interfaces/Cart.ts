import { CartItem } from "./CartItem"
import { v4 as uuid } from 'uuid';

export interface ICart {
  id: string
  items: CartItem[]
}

export class Cart implements ICart{
    id=uuid();
    items: CartItem[]=[];
}

export interface ICartTotals {
  shipping:number;
  subTotal:number;
  total:number;
}
