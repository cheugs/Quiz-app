// src/app/core/interceptors/loading.interceptor.ts
import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { NotificationService } from '../services/notification';

export const loadingInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const notificationService = inject(NotificationService);
  
  // Skip loading for certain requests
  const skipLoading = req.headers.has('X-Skip-Loading');
  if (skipLoading) {
    return next(req);
  }

  // Show loading
  notificationService.showLoading();

  return next(req).pipe(
    finalize(() => {
      // Hide loading
      notificationService.hideLoading();
    })
  );
};