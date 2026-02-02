import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { TestErrorComponent } from './Errors/test-error/test-error.component';
import { NotFoundComponent } from './Errors/not-found/not-found.component';
import { ServerErrorComponent } from './Errors/server-error/server-error.component';



@NgModule({
  declarations: [
    NavbarComponent,
    TestErrorComponent,
    NotFoundComponent,
    ServerErrorComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports:[
    NavbarComponent,
    TestErrorComponent,
    NotFoundComponent,
    ServerErrorComponent
  ]
})
export class CoreModule { }
