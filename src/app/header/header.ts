import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrl: './header.css',
  imports: [MatSlideToggleModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  readonly title = input.required<string>();
  private readonly themeService = inject(ThemeService);

  readonly theme = this.themeService.theme;

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
