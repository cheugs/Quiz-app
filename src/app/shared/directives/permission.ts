
// src/app/shared/directives/permission.ts
import { Directive, Input, TemplateRef, ViewContainerRef, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth';

@Directive({
  selector: '[appPermission]',
  standalone: true
})
export class PermissionDirective implements OnInit {
  @Input() appPermission: string[] = [];
  @Input() appPermissionMode: 'all' | 'any' = 'any';

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.updateView();
  }

  private updateView(): void {
    const hasPermission = this.checkPermissions();
    
    if (hasPermission) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

  private checkPermissions(): boolean {
    const user = this.authService.getCurrentUser();
    if (!user) return false;

    if (this.appPermissionMode === 'all') {
      return this.appPermission.every(permission => 
        user.permissions?.includes(permission)
      );
    } else {
      return this.appPermission.some(permission => 
        user.permissions?.includes(permission)
      );
    }
  }
}