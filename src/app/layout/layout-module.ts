import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Import standalone components and modules
import { SharedModule } from '../shared/shared-module';
import { MainLayoutComponent } from './main-layout/main-layout';
import { AuthLayoutComponent } from './auth-layout/auth-layout';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    // Import standalone layout components
    MainLayoutComponent,
    AuthLayoutComponent
  ],
  exports: [
    MainLayoutComponent,
    AuthLayoutComponent
  ]
})
export class LayoutModule { }