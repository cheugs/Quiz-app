import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="auth-layout">
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['./auth-layout.scss']
})
export class AuthLayoutComponent {}