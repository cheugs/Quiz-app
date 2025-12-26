// src/app/core/core.module.ts (Simplified - No interceptors)
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

// Services
import { AuthService } from './services/auth';
import { TokenService } from './services/token';
import { NotificationService } from './services/notification';
import { StorageService } from './services/storage';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    // Services only - Interceptors are already provided in app.config.ts
    AuthService,
    TokenService,
    NotificationService,
    StorageService
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule?: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only.');
    }
  }
}