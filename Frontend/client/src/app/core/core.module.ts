import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { TestErrorComponent } from './test-error/test-error.component';



@NgModule({
  declarations: [
    NavbarComponent,
    TestErrorComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports:[
    NavbarComponent,
    TestErrorComponent,
  ]
})
export class CoreModule { }
