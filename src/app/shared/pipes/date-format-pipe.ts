// src/app/shared/pipes/date-format.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat',
  standalone: true
})
export class DateFormatPipe implements PipeTransform {
  transform(value: Date | string | number | null | undefined, format: string = 'medium'): string {
    if (!value) return '';
    
    const date = new Date(value);
    
    if (isNaN(date.getTime())) return 'Invalid Date';

    switch (format) {
      case 'short':
        return date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        });
        
      case 'medium':
        return date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
        
      case 'long':
        return date.toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
        
      case 'time':
        return date.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit'
        });
        
      default:
        return date.toLocaleDateString();
    }
  }
}