import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  standalone:false,
  styleUrl: './server-error.component.scss'
})
export class ServerErrorComponent {
error: any;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.error = navigation?.extras?.state?.['error'];
  }

  reloadPage(event: Event) {
    const button = event.target as HTMLButtonElement;
    button.innerHTML =
      '<span class="spinner-border spinner-border-sm me-2"></span> Retrying...';
    button.disabled = true;

    setTimeout(() => window.location.reload(), 500);
  }
}