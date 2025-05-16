import { Component, AfterViewInit, Inject, PLATFORM_ID, OnDestroy, ChangeDetectorRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit, OnDestroy, OnChanges {
  @Input() latitude: number = -23.55052;  // valores padrão
  @Input() longitude: number = -46.63331;
  @Input() title: string = 'RJ'

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

      setTimeout(() => {
        this.initMap();
        this.cdr.detectChanges();
      }, 0);
    }
  }

  ngOnChanges(changes: SimpleChanges | any) {
  if (this.map && (changes.latitude || changes.longitude || changes.title)) {
    this.map.setView([this.latitude, this.longitude], 13);

    // Remove marcadores antigos para evitar acumulo
    this.map.eachLayer((layer: any) => {
      if (layer instanceof this.L.Marker) {
        this.map.removeLayer(layer);
      }
    });

    this.L.marker([this.latitude, this.longitude]).addTo(this.map)
      .bindPopup(`${this.title}`);  // popup só aparece ao clicar no marker

    setTimeout(() => this.map.invalidateSize(), 300);
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

    this.map = this.L.map(mapElement).setView([this.latitude, this.longitude], 13);

    this.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    this.L.marker([this.latitude, this.longitude]).addTo(this.map)
      .bindPopup(`<h2 style="font-weight:bold;font-size:14px;">${this.title}</h2>`)
      // .openPopup();

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