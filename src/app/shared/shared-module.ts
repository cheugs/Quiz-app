import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Import standalone components
import { HeaderComponent } from './components/header/header';
import { SidebarComponent } from './components/sidebar/sidebar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    // Import standalone components if needed by other modules
    HeaderComponent,
    SidebarComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HeaderComponent,
    SidebarComponent
  ]
})
export class SharedModule { }