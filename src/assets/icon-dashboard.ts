// src/app/shared/components/icons/icons.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

// Base icon component
@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span [class]="iconClass" [style.width.px]="size" [style.height.px]="size" [style.color]="color">
      <ng-content></ng-content>
    </span>
  `,
  styles: [`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    span {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    svg {
      display: block;
      width: 100%;
      height: 100%;
      stroke: currentColor;
      fill: none;
    }
  `]
})
export class IconComponent {
  @Input() size = 20;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

// Individual icon components
@Component({
  selector: 'app-search-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="8"/>
        <path d="m21 21-4.35-4.35"/>
      </svg>
    </app-icon>
  `
})
export class SearchIconComponent {
  @Input() size = 20;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

@Component({
  selector: 'app-message-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    </app-icon>
  `
})
export class MessageIconComponent {
  @Input() size = 20;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

@Component({
  selector: 'app-bell-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
        <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
      </svg>
    </app-icon>
  `
})
export class BellIconComponent {
  @Input() size = 20;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

@Component({
  selector: 'app-grid-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <rect x="3" y="3" width="7" height="7"/>
        <rect x="14" y="3" width="7" height="7"/>
        <rect x="14" y="14" width="7" height="7"/>
        <rect x="3" y="14" width="7" height="7"/>
      </svg>
    </app-icon>
  `
})
export class GridIconComponent {
  @Input() size = 20;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

@Component({
  selector: 'app-users-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    </app-icon>
  `
})
export class UsersIconComponent {
  @Input() size = 24;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

@Component({
  selector: 'app-trending-up-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>
    </app-icon>
  `
})
export class TrendingUpIconComponent {
  @Input() size = 16;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

@Component({
  selector: 'app-trending-down-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/>
        <polyline points="17 18 23 18 23 12"/>
      </svg>
    </app-icon>
  `
})
export class TrendingDownIconComponent {
  @Input() size = 16;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

@Component({
  selector: 'app-quiz-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <line x1="10" y1="9" x2="8" y2="9"/>
      </svg>
    </app-icon>
  `
})
export class QuizIconComponent {
  @Input() size = 24;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

@Component({
  selector: 'app-calendar-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    </app-icon>
  `
})
export class CalendarIconComponent {
  @Input() size = 20;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

@Component({
  selector: 'app-clock-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    </app-icon>
  `
})
export class ClockIconComponent {
  @Input() size = 20;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

@Component({
  selector: 'app-check-circle-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    </app-icon>
  `
})
export class CheckCircleIconComponent {
  @Input() size = 20;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

@Component({
  selector: 'app-bar-chart-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <line x1="12" y1="20" x2="12" y2="10"/>
        <line x1="18" y1="20" x2="18" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="16"/>
      </svg>
    </app-icon>
  `
})
export class BarChartIconComponent {
  @Input() size = 24;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

@Component({
  selector: 'app-award-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <circle cx="12" cy="8" r="7"/>
        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
      </svg>
    </app-icon>
  `
})
export class AwardIconComponent {
  @Input() size = 24;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

@Component({
  selector: 'app-activity-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    </app-icon>
  `
})
export class ActivityIconComponent {
  @Input() size = 24;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

// Course Management Icon Components
@Component({
  selector: 'app-course-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
        <path d="M9 10h6"/>
        <path d="M12 7v6"/>
      </svg>
    </app-icon>
  `
})
export class CourseIconComponent {
  @Input() size = 24;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

@Component({
  selector: 'app-add-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M12 5v14"/>
        <path d="M5 12h14"/>
      </svg>
    </app-icon>
  `
})
export class AddIconComponent {
  @Input() size = 24;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

@Component({
  selector: 'app-edit-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
      </svg>
    </app-icon>
  `
})
export class EditIconComponent {
  @Input() size = 20;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

@Component({
  selector: 'app-delete-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M3 6h18"/>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/>
        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
        <line x1="10" y1="11" x2="10" y2="17"/>
        <line x1="14" y1="11" x2="14" y2="17"/>
      </svg>
    </app-icon>
  `
})
export class DeleteIconComponent {
  @Input() size = 20;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

@Component({
  selector: 'app-filter-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
      </svg>
    </app-icon>
  `
})
export class FilterIconComponent {
  @Input() size = 20;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

@Component({
  selector: 'app-chevron-down-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <polyline points="6 9 12 15 18 9"/>
      </svg>
    </app-icon>
  `
})
export class ChevronDownIconComponent {
  @Input() size = 20;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

@Component({
  selector: 'app-chevron-up-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <polyline points="18 15 12 9 6 15"/>
      </svg>
    </app-icon>
  `
})
export class ChevronUpIconComponent {
  @Input() size = 20;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

@Component({
  selector: 'app-more-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="1"/>
        <circle cx="19" cy="12" r="1"/>
        <circle cx="5" cy="12" r="1"/>
      </svg>
    </app-icon>
  `
})
export class MoreIconComponent {
  @Input() size = 20;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

@Component({
  selector: 'app-upload-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="17 8 12 3 7 8"/>
        <line x1="12" y1="3" x2="12" y2="15"/>
      </svg>
    </app-icon>
  `
})
export class UploadIconComponent {
  @Input() size = 20;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

@Component({
  selector: 'app-download-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="7 10 12 15 17 10"/>
        <line x1="12" y1="15" x2="12" y2="3"/>
      </svg>
    </app-icon>
  `
})
export class DownloadIconComponent {
  @Input() size = 20;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

@Component({
  selector: 'app-check-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    </app-icon>
  `
})
export class CheckIconComponent {
  @Input() size = 20;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

@Component({
  selector: 'app-x-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <line x1="18" y1="6" x2="6" y2="18"/>
        <line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    </app-icon>
  `
})
export class XIconComponent {
  @Input() size = 20;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

@Component({
  selector: 'app-refresh-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
        <path d="M3 3v5h5"/>
        <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/>
        <path d="M16 16h5v5"/>
      </svg>
    </app-icon>
  `
})
export class RefreshIconComponent {
  @Input() size = 20;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

@Component({
  selector: 'app-eye-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    </app-icon>
  `
})
export class EyeIconComponent {
  @Input() size = 20;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

// Add these components to your existing ICON_COMPONENTS array

@Component({
  selector: 'app-mail-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
    </app-icon>
  `
})
export class MailIconComponent {
  @Input() size = 20;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

@Component({
  selector: 'app-message-square-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    </app-icon>
  `
})
export class MessageSquareIconComponent {
  @Input() size = 20;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

@Component({
  selector: 'app-alert-circle-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
    </app-icon>
  `
})
export class AlertCircleIconComponent {
  @Input() size = 20;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

@Component({
  selector: 'app-info-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="16" x2="12" y2="12"/>
        <line x1="12" y1="8" x2="12.01" y2="8"/>
      </svg>
    </app-icon>
  `
})
export class InfoIconComponent {
  @Input() size = 20;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

@Component({
  selector: 'app-file-text-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10 9 9 9 8 9"/>
      </svg>
    </app-icon>
  `
})
export class FileTextIconComponent {
  @Input() size = 20;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

// Add these to your icons.component.ts
@Component({
  selector: 'app-save-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
        <polyline points="17 21 17 13 7 13 7 21"/>
        <polyline points="7 3 7 8 15 8"/>
      </svg>
    </app-icon>
  `
})
export class SaveIconComponent {
  @Input() size = 20;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

@Component({
  selector: 'app-plus-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <line x1="12" y1="5" x2="12" y2="19"/>
        <line x1="5" y1="12" x2="19" y2="12"/>
      </svg>
    </app-icon>
  `
})
export class PlusIconComponent {
  @Input() size = 20;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

@Component({
  selector: 'app-minus-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <line x1="5" y1="12" x2="19" y2="12"/>
      </svg>
    </app-icon>
  `
})
export class MinusIconComponent {
  @Input() size = 20;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

@Component({
  selector: 'app-trash2-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M3 6h18"/>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/>
        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
        <line x1="10" y1="11" x2="10" y2="17"/>
        <line x1="14" y1="11" x2="14" y2="17"/>
      </svg>
    </app-icon>
  `
})
export class Trash2IconComponent {
  @Input() size = 20;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

@Component({
  selector: 'app-copy-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
      </svg>
    </app-icon>
  `
})
export class CopyIconComponent {
  @Input() size = 20;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

@Component({
  selector: 'app-list-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <line x1="8" y1="6" x2="21" y2="6"/>
        <line x1="8" y1="12" x2="21" y2="12"/>
        <line x1="8" y1="18" x2="21" y2="18"/>
        <line x1="3" y1="6" x2="3.01" y2="6"/>
        <line x1="3" y1="12" x2="3.01" y2="12"/>
        <line x1="3" y1="18" x2="3.01" y2="18"/>
      </svg>
    </app-icon>
  `
})
export class ListIconComponent {
  @Input() size = 20;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

@Component({
  selector: 'app-toggle-right-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <rect x="1" y="5" width="22" height="14" rx="7" ry="7"/>
        <circle cx="16" cy="12" r="3"/>
      </svg>
    </app-icon>
  `
})
export class ToggleRightIconComponent {
  @Input() size = 20;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

@Component({
  selector: 'app-maximize-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
      </svg>
    </app-icon>
  `
})
export class MaximizeIconComponent {
  @Input() size = 20;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

@Component({
  selector: 'app-minimize-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/>
      </svg>
    </app-icon>
  `
})
export class MinimizeIconComponent {
  @Input() size = 20;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

@Component({
  selector: 'app-superscript-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="m4 19 8-8m0 0v8m0-8H4m16 0h-4l4-4m-4 4v8"/>
      </svg>
    </app-icon>
  `
})
export class SuperscriptIconComponent {
  @Input() size = 20;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

// Add these components to your existing icons.component.ts file:

@Component({
  selector: 'app-link-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
      </svg>
    </app-icon>
  `
})
export class LinkIconComponent {
  @Input() size = 20;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

@Component({
  selector: 'app-image-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
        <circle cx="8.5" cy="8.5" r="1.5"/>
        <polyline points="21 15 16 10 5 21"/>
      </svg>
    </app-icon>
  `
})
export class ImageIconComponent {
  @Input() size = 20;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

@Component({
  selector: 'app-video-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <polygon points="23 7 16 12 23 17 23 7"/>
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
      </svg>
    </app-icon>
  `
})
export class VideoIconComponent {
  @Input() size = 20;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

@Component({
  selector: 'app-file-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/>
        <polyline points="13 2 13 9 20 9"/>
      </svg>
    </app-icon>
  `
})
export class FileIconComponent {
  @Input() size = 20;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

@Component({
  selector: 'app-help-circle-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10"/>
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    </app-icon>
  `
})
export class HelpCircleIconComponent {
  @Input() size = 20;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

@Component({
  selector: 'app-settings-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
      </svg>
    </app-icon>
  `
})
export class SettingsIconComponent {
  @Input() size = 20;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

@Component({
  selector: 'app-external-link-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
        <polyline points="15 3 21 3 21 9"/>
        <line x1="10" y1="14" x2="21" y2="3"/>
      </svg>
    </app-icon>
  `
})
export class ExternalLinkIconComponent {
  @Input() size = 20;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

// Add to your existing icons.component.ts file
@Component({
  selector: 'app-book-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
      </svg>
    </app-icon>
  `
})
export class BookIconComponent {
  @Input() size = 24;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

@Component({
  selector: 'app-school-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M12 22v-6"/>
        <path d="M4 6V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2"/>
        <path d="M22 10v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8"/>
        <path d="M2 10h20"/>
        <path d="M12 6v6"/>
        <path d="m7 14 5 5 5-5"/>
      </svg>
    </app-icon>
  `
})
export class SchoolIconComponent {
  @Input() size = 24;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

@Component({
  selector: 'app-timer-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    </app-icon>
  `
})
export class TimerIconComponent {
  @Input() size = 24;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

@Component({
  selector: 'app-check-square-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <polyline points="9 11 12 14 22 4"/>
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
      </svg>
    </app-icon>
  `
})
export class CheckSquareIconComponent {
  @Input() size = 24;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

@Component({
  selector: 'app-shuffle-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <polyline points="16 3 21 3 21 8"/>
        <line x1="4" y1="20" x2="21" y2="3"/>
        <polyline points="21 16 21 21 16 21"/>
        <line x1="15" y1="15" x2="21" y2="21"/>
        <line x1="4" y1="4" x2="9" y2="9"/>
      </svg>
    </app-icon>
  `
})
export class ShuffleIconComponent {
  @Input() size = 24;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

@Component({
  selector: 'app-eye-off-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/>
        <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/>
        <line x1="2" y1="2" x2="22" y2="22"/>
      </svg>
    </app-icon>
  `
})
export class EyeOffIconComponent {
  @Input() size = 24;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

@Component({
  selector: 'app-layers-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <polygon points="12 2 2 7 12 12 22 7 12 2"/>
        <polyline points="2 17 12 22 22 17"/>
        <polyline points="2 12 12 17 22 12"/>
      </svg>
    </app-icon>
  `
})
export class LayersIconComponent {
  @Input() size = 24;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

@Component({
  selector: 'app-percent-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <line x1="19" y1="5" x2="5" y2="19"/>
        <circle cx="6.5" cy="6.5" r="2.5"/>
        <circle cx="17.5" cy="17.5" r="2.5"/>
      </svg>
    </app-icon>
  `
})
export class PercentIconComponent {
  @Input() size = 24;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

@Component({
  selector: 'app-send-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <line x1="22" y1="2" x2="11" y2="13"/>
        <polygon points="22 2 15 22 11 13 2 9 22 2"/>
      </svg>
    </app-icon>
  `
})
export class SendIconComponent {
  @Input() size = 24;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

@Component({
  selector: 'app-tag-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M12 2H2v10l9.29 9.29a2 2 0 0 0 2.82 0l6.58-6.58a2 2 0 0 0 0-2.83L12 2z"/>
        <circle cx="7" cy="7" r="1"/>
      </svg>
    </app-icon>
  `
})
export class TagIconComponent {
  @Input() size = 24;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}
 
// Add to your existing icons.component.ts file
@Component({
  selector: 'app-repeat-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <polyline points="17 1 21 5 17 9"/>
        <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
        <polyline points="7 23 3 19 7 15"/>
        <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
      </svg>
    </app-icon>
  `
})
export class RepeatIconComponent {
  @Input() size = 24;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

@Component({
  selector: 'app-square-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
      </svg>
    </app-icon>
  `
})
export class SquareIconComponent {
  @Input() size = 24;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

@Component({
  selector: 'app-chevron-left-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <polyline points="15 18 9 12 15 6"/>
      </svg>
    </app-icon>
  `
})
export class ChevronLeftIconComponent {
  @Input() size = 24;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

@Component({
  selector: 'app-chevron-right-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <polyline points="9 18 15 12 9 6"/>
      </svg>
    </app-icon>
  `
})
export class ChevronRightIconComponent {
  @Input() size = 24;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}
 
@Component({
  selector: 'app-hash-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <line x1="4" y1="9" x2="20" y2="9"/>
        <line x1="4" y1="15" x2="20" y2="15"/>
        <line x1="10" y1="3" x2="8" y2="21"/>
        <line x1="16" y1="3" x2="14" y2="21"/>
      </svg>
    </app-icon>
  `
})
export class HashIconComponent {
  @Input() size = 20;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

@Component({
  selector: 'app-type-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <polyline points="4 7 4 4 20 4 20 7"/>
        <line x1="9" y1="20" x2="15" y2="20"/>
        <line x1="12" y1="4" x2="12" y2="20"/>
      </svg>
    </app-icon>
  `
})
export class TypeIconComponent {
  @Input() size = 20;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

@Component({
  selector: 'app-circle-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10"/>
      </svg>
    </app-icon>
  `
})
export class CircleIconComponent {
  @Input() size = 20;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

@Component({
  selector: 'app-x-circle-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10"/>
        <line x1="15" y1="9" x2="9" y2="15"/>
        <line x1="9" y1="9" x2="15" y2="15"/>
      </svg>
    </app-icon>
  `
})
export class XCircleIconComponent {
  @Input() size = 20;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

// Also add these additional icons that might be useful for your quiz management:

@Component({
  selector: 'app-arrow-up-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <line x1="12" y1="19" x2="12" y2="5"/>
        <polyline points="5 12 12 5 19 12"/>
      </svg>
    </app-icon>
  `
})
export class ArrowUpIconComponent {
  @Input() size = 20;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

@Component({
  selector: 'app-arrow-down-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <line x1="12" y1="5" x2="12" y2="19"/>
        <polyline points="19 12 12 19 5 12"/>
      </svg>
    </app-icon>
  `
})
export class ArrowDownIconComponent {
  @Input() size = 20;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

@Component({
  selector: 'app-arrow-left-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <line x1="19" y1="12" x2="5" y2="12"/>
        <polyline points="12 19 5 12 12 5"/>
      </svg>
    </app-icon>
  `
})
export class ArrowLeftIconComponent {
  @Input() size = 20;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

@Component({
  selector: 'app-arrow-right-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <line x1="5" y1="12" x2="19" y2="12"/>
        <polyline points="12 5 19 12 12 19"/>
      </svg>
    </app-icon>
  `
})
export class ArrowRightIconComponent {
  @Input() size = 20;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

@Component({
  selector: 'app-sliders-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <line x1="4" y1="21" x2="4" y2="14"/>
        <line x1="4" y1="10" x2="4" y2="3"/>
        <line x1="12" y1="21" x2="12" y2="12"/>
        <line x1="12" y1="8" x2="12" y2="3"/>
        <line x1="20" y1="21" x2="20" y2="16"/>
        <line x1="20" y1="12" x2="20" y2="3"/>
        <line x1="1" y1="14" x2="7" y2="14"/>
        <line x1="9" y1="8" x2="15" y2="8"/>
        <line x1="17" y1="16" x2="23" y2="16"/>
      </svg>
    </app-icon>
  `
})
export class SlidersIconComponent {
  @Input() size = 20;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

@Component({
  selector: 'app-folder-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
      </svg>
    </app-icon>
  `
})
export class FolderIconComponent {
  @Input() size = 20;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

@Component({
  selector: 'app-upload-cloud-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <polyline points="16 16 12 12 8 16"/>
        <line x1="12" y1="12" x2="12" y2="21"/>
        <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
        <polyline points="16 16 12 12 8 16"/>
      </svg>
    </app-icon>
  `
})
export class UploadCloudIconComponent {
  @Input() size = 20;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

@Component({
  selector: 'app-download-cloud-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <polyline points="8 17 12 21 16 17"/>
        <line x1="12" y1="12" x2="12" y2="21"/>
        <path d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29"/>
      </svg>
    </app-icon>
  `
})
export class DownloadCloudIconComponent {
  @Input() size = 20;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

@Component({
  selector: 'app-edit-2-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
      </svg>
    </app-icon>
  `
})
export class Edit2IconComponent {
  @Input() size = 20;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

@Component({
  selector: 'app-trash-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M3 6h18"/>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/>
        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
        <line x1="10" y1="11" x2="10" y2="17"/>
        <line x1="14" y1="11" x2="14" y2="17"/>
      </svg>
    </app-icon>
  `
})
export class TrashIconComponent {
  @Input() size = 20;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

@Component({
  selector: 'app-close-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <line x1="18" y1="6" x2="6" y2="18"/>
        <line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    </app-icon>
  `
})
export class CloseIconComponent {
  @Input() size = 20;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

@Component({
  selector: 'app-search-minus-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="8"/>
        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        <line x1="8" y1="11" x2="14" y2="11"/>
      </svg>
    </app-icon>
  `
})
export class SearchMinusIconComponent {
  @Input() size = 20;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

@Component({
  selector: 'app-search-plus-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="8"/>
        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        <line x1="11" y1="8" x2="11" y2="14"/>
        <line x1="8" y1="11" x2="14" y2="11"/>
      </svg>
    </app-icon>
  `
})
export class SearchPlusIconComponent {
  @Input() size = 20;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

// Add these to your existing icon-dashboard.ts file

@Component({
  selector: 'app-phone-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    </app-icon>
  `
})
export class PhoneIconComponent {
  @Input() size = 20;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

@Component({
  selector: 'app-user-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    </app-icon>
  `
})
export class UserIconComponent {
  @Input() size = 20;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

@Component({
  selector: 'app-building-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M3 21h18"/>
        <path d="M19 21V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v14"/>
        <path d="M9 21v-4h6v4"/>
        <path d="M10 7h4"/>
        <path d="M10 11h4"/>
        <path d="M10 15h4"/>
      </svg>
    </app-icon>
  `
})
export class BuildingIconComponent {
  @Input() size = 20;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}
 
// Add these components to your icon-dashboard.ts file

@Component({
  selector: 'app-map-pin-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    </app-icon>
  `
})
export class MapPinIconComponent {
  @Input() size = 20;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

@Component({
  selector: 'app-user-check-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="8.5" cy="7" r="4"/>
        <polyline points="17 11 19 13 23 9"/>
      </svg>
    </app-icon>
  `
})
export class UserCheckIconComponent {
  @Input() size = 20;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

@Component({
  selector: 'app-shield-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    </app-icon>
  `
})
export class ShieldIconComponent {
  @Input() size = 20;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}








 

@Component({
  selector: 'app-user-x-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="8.5" cy="7" r="4"/>
        <line x1="18" y1="8" x2="23" y2="13"/>
        <line x1="23" y1="8" x2="18" y2="13"/>
      </svg>
    </app-icon>
  `
})
export class UserXIconComponent {
  @Input() size = 20;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

 
 

@Component({
  selector: 'app-key-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>
      </svg>
    </app-icon>
  `
})
export class KeyIconComponent {
  @Input() size = 20;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

@Component({
  selector: 'app-lock-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    </app-icon>
  `
})
export class LockIconComponent {
  @Input() size = 20;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

@Component({
  selector: 'app-unlock-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
        <path d="M7 11V7a5 5 0 0 1 9.9-1"/>
      </svg>
    </app-icon>
  `
})
export class UnlockIconComponent {
  @Input() size = 20;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

@Component({
  selector: 'app-star-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <app-icon [size]="size" [color]="color" [iconClass]="iconClass">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    </app-icon>
  `
})
export class StarIconComponent {
  @Input() size = 20;
  @Input() color = 'currentColor';
  @Input() iconClass = '';
}

// Export all icon components
export const ICON_COMPONENTS = [
  IconComponent,
  SearchIconComponent,
  MessageIconComponent,
  BellIconComponent,
  GridIconComponent,
  UsersIconComponent,
  TrendingUpIconComponent,
  TrendingDownIconComponent,
  QuizIconComponent,
  CalendarIconComponent,
  ClockIconComponent,
  CheckCircleIconComponent,
  BarChartIconComponent,
  AwardIconComponent,
  ActivityIconComponent,
    CourseIconComponent,
  AddIconComponent,
  EditIconComponent,
  DeleteIconComponent,
  FilterIconComponent,
  ChevronDownIconComponent,
  ChevronUpIconComponent,
  MoreIconComponent,
  UploadIconComponent,
  DownloadIconComponent,
  CheckIconComponent,
  XIconComponent,
  RefreshIconComponent,
  EyeIconComponent,
  MailIconComponent,
  MessageSquareIconComponent,
  AlertCircleIconComponent,
  InfoIconComponent,
  FileTextIconComponent,
    SaveIconComponent,
    PlusIconComponent,
    MinusIconComponent,
    Trash2IconComponent,
    CopyIconComponent,
    LinkIconComponent,
    ImageIconComponent,
    VideoIconComponent,
    FileIconComponent,
    HelpCircleIconComponent,
    SettingsIconComponent,
    MaximizeIconComponent,
    MinimizeIconComponent,
    ExternalLinkIconComponent,
    BookIconComponent,
    SchoolIconComponent,
    TimerIconComponent,
    CheckSquareIconComponent,
    ShuffleIconComponent,
    EyeOffIconComponent,  
    LayersIconComponent,
    PercentIconComponent,
    SendIconComponent,
    TagIconComponent,
    RepeatIconComponent,
    SquareIconComponent,
    ChevronLeftIconComponent,
    ChevronRightIconComponent,
     HashIconComponent,
  TypeIconComponent,
  CircleIconComponent,
  XCircleIconComponent,
  ArrowUpIconComponent,
  ArrowDownIconComponent,
  ArrowLeftIconComponent,
  ArrowRightIconComponent,
  SlidersIconComponent,
  FolderIconComponent,
  UploadCloudIconComponent,
  DownloadCloudIconComponent,
  Edit2IconComponent,
  TrashIconComponent,
  CloseIconComponent,
  SearchMinusIconComponent,
  SearchPlusIconComponent,
  ToggleRightIconComponent, // Already exists in your file
  ListIconComponent, // Already exists in your file
  SuperscriptIconComponent, // Already exists in your file 
  PhoneIconComponent,
  UserIconComponent,
  BuildingIconComponent,
  MapPinIconComponent,
  UserCheckIconComponent,
  ShieldIconComponent,
  UserXIconComponent,
  KeyIconComponent,
  LockIconComponent,
  UnlockIconComponent,
  StarIconComponent
];