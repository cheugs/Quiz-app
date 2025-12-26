import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-student-management',
  standalone: true,
  imports: [CommonModule ],
  template: `
    <div class="student-management">
      <div class="page-header">
        <h1>Student Management</h1>
        <p>Manage student accounts and access</p>
      </div>
      <div class="content">
        <!-- Student management content will go here -->
        <p>Student Management page is under development...</p>
      </div>
    </div>
  `,
  styleUrls: ['./student-management.scss']
})
export class StudentManagementComponent {}