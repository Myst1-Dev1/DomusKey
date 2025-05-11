import {
  Component,
  AfterViewInit,
  Inject,
  PLATFORM_ID,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

let L: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit, OnDestroy {
  private map: any;
  private L: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef
  ) {}

  async ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const leaflet = await import('leaflet');
      this.L = leaflet;

      // Espera o DOM estabilizar antes de iniciar o mapa
      setTimeout(() => {
        this.initMap();
        this.cdr.detectChanges(); // garante atualização do Angular
      }, 0);
    }
  }

  private initMap(): void {
    if (this.map) {
      this.map.remove();
    }

    const mapElement = document.getElementById('map');
    if (!mapElement) {
      console.warn('map element not found!');
      return;
    }

    this.map = this.L.map(mapElement).setView([-23.55052, -46.63331], 13);

    this.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    this.L.marker([-23.55052, -46.63331]).addTo(this.map)
      .bindPopup('São Paulo')
      .openPopup();

    // Garante que redimensione corretamente
    setTimeout(() => {
      this.map.invalidateSize();
    }, 300);
  }

  ngOnDestroy() {
    if (this.map) {
      this.map.remove();
    }
  }
}