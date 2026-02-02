import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  standalone:false,
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {
goBack() {
  window.history.back();
}
}
