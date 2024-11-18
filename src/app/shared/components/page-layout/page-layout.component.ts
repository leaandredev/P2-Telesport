import { Component, Input } from '@angular/core';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-layout',
  standalone: true,
  imports: [LoadingSpinnerComponent, CommonModule],
  templateUrl: './page-layout.component.html',
  styleUrl: './page-layout.component.scss',
})
export class PageLayoutComponent {
  @Input() errorMessage: string | null = null;
  @Input() loading: boolean = false;
  @Input() subTitle: string | null = null;
}
