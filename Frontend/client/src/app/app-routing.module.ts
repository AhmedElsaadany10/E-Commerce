import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TestErrorComponent } from './core/Errors/test-error/test-error.component';
import { NotFoundComponent } from './core/Errors/not-found/not-found.component';
import { ServerErrorComponent } from './core/Errors/server-error/server-error.component';

const routes: Routes = [
  {path:'',component:HomeComponent,data:{breadcrumb:'Home'}},
  {path:'error',component:TestErrorComponent,data:{breadcrumb:'Test Errors'}},
  {path:'not-found',component:NotFoundComponent,data:{breadcrumb:'Not Found'}},
  {path:'server-error',component:ServerErrorComponent,data:{breadcrumb:'Server Error'}},
  {path:'shop',loadChildren:()=>import('./shop/shop.module').then(mod=>mod.ShopModule),data:{breadcrumb:'Shop'}},
  {path:'cart',loadChildren:()=>import('./cart/cart.module').then(mod=>mod.CartModule),data:{breadcrumb:'cart'}},
  {path:'**',redirectTo:'not-found',pathMatch:'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
