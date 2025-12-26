import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../shared/components/header/header';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.html',
  styleUrls: ['./main-layout.scss'],
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, SidebarComponent]
})
export class MainLayoutComponent {
  isSidebarCollapsed = false;

  onSidebarToggle(isCollapsed: boolean) {
    this.isSidebarCollapsed = isCollapsed;
  }
}