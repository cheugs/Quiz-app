import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule ],
  template: `
    <div class="user-management">
      <div class="page-header">
        <h1>User Management</h1>
        <p>Manage administrator accounts and permissions (Super Admin only)</p>
      </div>
      <div class="content">
        <!-- User management content will go here -->
        <p>User Management page is under development...</p>
      </div>
    </div>
  `,
  styleUrls: ['./user-management.scss']
})
export class UserManagementComponent {}