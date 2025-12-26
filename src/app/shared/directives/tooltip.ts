
// src/app/shared/directives/tooltip.ts
import { Directive, ElementRef, Input, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[appTooltip]',
  standalone: true
})
export class TooltipDirective implements OnInit {
  @Input() appTooltip: string = '';
  @Input() tooltipPosition: 'top' | 'bottom' | 'left' | 'right' = 'top';
  
  private tooltipElement: HTMLElement | null = null;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {}

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (!this.appTooltip) return;
    
    this.createTooltip();
    this.setPosition();
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.removeTooltip();
  }

  private createTooltip(): void {
    this.tooltipElement = document.createElement('div');
    this.tooltipElement.className = 'custom-tooltip';
    this.tooltipElement.textContent = this.appTooltip;
    this.tooltipElement.style.position = 'absolute';
    this.tooltipElement.style.zIndex = '1000';
    
    document.body.appendChild(this.tooltipElement);
  }

  private setPosition(): void {
    if (!this.tooltipElement) return;

    const rect = this.el.nativeElement.getBoundingClientRect();
    const tooltipRect = this.tooltipElement.getBoundingClientRect();

    switch (this.tooltipPosition) {
      case 'top':
        this.tooltipElement.style.top = `${rect.top - tooltipRect.height - 10}px`;
        this.tooltipElement.style.left = `${rect.left + (rect.width - tooltipRect.width) / 2}px`;
        break;
      case 'bottom':
        this.tooltipElement.style.top = `${rect.bottom + 10}px`;
        this.tooltipElement.style.left = `${rect.left + (rect.width - tooltipRect.width) / 2}px`;
        break;
      case 'left':
        this.tooltipElement.style.top = `${rect.top + (rect.height - tooltipRect.height) / 2}px`;
        this.tooltipElement.style.left = `${rect.left - tooltipRect.width - 10}px`;
        break;
      case 'right':
        this.tooltipElement.style.top = `${rect.top + (rect.height - tooltipRect.height) / 2}px`;
        this.tooltipElement.style.left = `${rect.right + 10}px`;
        break;
    }
  }

  private removeTooltip(): void {
    if (this.tooltipElement) {
      this.tooltipElement.remove();
      this.tooltipElement = null;
    }
  }
}
