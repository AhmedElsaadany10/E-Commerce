import { Component } from '@angular/core';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  standalone:false,
  styleUrl: './server-error.component.scss'
})
export class ServerErrorComponent {
reloadPage() {
  // Show loading state
  const button = event?.target as HTMLElement;
  const originalContent = button.innerHTML;
  button.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> Retrying...';
  button.setAttribute('disabled', 'true');
  
  // Reload after a brief delay for better UX
  setTimeout(() => {
    window.location.reload();
  }, 500);
}
}
