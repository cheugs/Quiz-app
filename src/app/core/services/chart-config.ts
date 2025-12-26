// src/app/core/services/chart-config.service.ts
import { Injectable } from '@angular/core';
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  LineController,
  BarController,
  DoughnutController,
  PieController,
  RadialLinearScale
} from 'chart.js';

@Injectable({
  providedIn: 'root'
})
export class ChartConfigService {
  constructor() {
    this.registerCharts();
    this.setGlobalDefaults();
  }

  registerCharts(): void {
    Chart.register(
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement,
      BarElement,
      ArcElement,
      Title,
      Tooltip,
      Legend,
      Filler,
      LineController,
      BarController,
      DoughnutController,
      PieController,
      RadialLinearScale
    );
  }

  setGlobalDefaults(): void {
    // Set global chart defaults
    Chart.defaults.font.family = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    Chart.defaults.font.size = 12;
    Chart.defaults.color = '#6b7280';
    
    // Set responsive defaults
    Chart.defaults.responsive = true;
    Chart.defaults.maintainAspectRatio = false;
  }

  // Helper methods for common chart configurations
  getLineChartOptions(): any {
    return {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          mode: 'index',
          intersect: false,
        }
      },
      scales: {
        x: {
          grid: {
            display: false
          }
        },
        y: {
          beginAtZero: true,
          grid: {
            borderDash: [3, 3]
          }
        }
      }
    };
  }

  getBarChartOptions(): any {
    return {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        }
      },
      scales: {
        x: {
          grid: {
            display: false
          }
        },
        y: {
          beginAtZero: true,
          grid: {
            borderDash: [3, 3]
          }
        }
      }
    };
  }

  getPieChartOptions(): any {
    return {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
        }
      }
    };
  }

  // Color palette
  getColors(): string[] {
    return [
      '#6b8e7f', // Primary green
      '#3b82f6', // Blue
      '#f59e0b', // Amber
      '#10b981', // Emerald
      '#8b5cf6', // Violet
      '#ef4444', // Red
      '#f97316', // Orange
      '#84cc16'  // Lime
    ];
  }
}