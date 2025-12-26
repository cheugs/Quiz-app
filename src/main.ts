// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';

import { AppComponent } from './app/app';
import { routes } from './app/app.routes';

// Import your core services
import { AuthService } from './app/core/services/auth';
import { TokenService } from './app/core/services/token';
import { NotificationService } from './app/core/services/notification';
import { StorageService } from './app/core/services/storage';

// Import Material modules if needed globally
import { MatNativeDateModule } from '@angular/material/core';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(
      // Add your interceptors here
      // withInterceptors([authInterceptor, errorInterceptor])
    ),
    importProvidersFrom(MatNativeDateModule),
    
    // Core services
    AuthService,
    TokenService,
    NotificationService,
    StorageService
  ]
}).catch(err => console.error(err));