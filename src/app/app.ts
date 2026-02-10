import { Component, signal, inject, DestroyRef, afterNextRender, ChangeDetectionStrategy, effect, HostBinding } from '@angular/core';
import { Map, TileLayer } from 'leaflet';
import { HeaderComponent } from './header/header';
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  private readonly destroyRef = inject(DestroyRef);
  private readonly themeService = inject(ThemeService);
  protected readonly title = signal('chizu-lab');
  private myMap!: Map;

  @HostBinding('class')
  get themeClass(): string {
    return this.themeService.theme() === 'dark' ? 'theme-dark' : '';
  }

  constructor() {
    // View がレンダリングされた後にMapを初期化する
    afterNextRender(() => {
      this.initMap();
    });
  }

  private initMap(): void {
    // 地図の初期化: id='map' の要素に地図を表示
    this.myMap = new Map('map');
    // 地図の中心座標とズームレベルを設定: 東京付近
    this.myMap.setView([35.6869, 139.7529], 13);

    // OpenStreetMapのタイルレイヤーを追加
    new TileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.myMap);

    // コンポーネントが破棄されるときに地図をクリーンアップ
    this.destroyRef.onDestroy(() => {
      this.myMap.remove();
    });
  }
}
