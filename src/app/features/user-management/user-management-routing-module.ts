// src/app/features/user-management/user-management-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserManagementComponent } from './user-management';
import { superAdminGuard } from '../../core/guards/super-admin-guard';

const routes: Routes = [
  {
    path: '',
    component: UserManagementComponent,
    canActivate: [superAdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }