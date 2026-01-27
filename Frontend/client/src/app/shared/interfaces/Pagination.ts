import { Product } from "./Product";

export interface Pagination{
    pageIndex:number;
    pageSize:number;
    count:number;
    data:Product[];
}