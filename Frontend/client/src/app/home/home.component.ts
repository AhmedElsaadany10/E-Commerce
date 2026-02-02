import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: false,
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private toastr: ToastrService) {}
testToast() {
  this.toastr.success('Toastr is working!', 'Success');
}
}
