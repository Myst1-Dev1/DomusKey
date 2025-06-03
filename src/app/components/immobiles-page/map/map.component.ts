import {
  Component,
  Inject,
  PLATFORM_ID,
  OnDestroy,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnChanges, OnDestroy {
  @Input() immobiles: { latitude: number, longitude: number, title: string, img:string }[] = [];

  private map: any;
  private L: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  async ngOnChanges(changes: SimpleChanges) {
    if (isPlatformBrowser(this.platformId)) {
      if (!this.L) {
          const leaflet = await import('leaflet');
          this.L = leaflet.default;
      }

      if (changes['immobiles'] && this.immobiles?.length > 0) {
        setTimeout(() => this.initMap(), 0);
      }
    }
  }

  private initMap(): void {
    if (!this.L) return;

    if (this.map) {
      this.map.remove();
    }

    const mapElement = document.getElementById('map');
    if (!mapElement) {
      console.warn('Elemento do mapa não encontrado!');
      return;
    }

    const first = this.immobiles[0];
    const center = first ? [first.latitude, first.longitude] : [-23.55052, -46.63331];
    const zoom = 11;

    this.map = this.L.map(mapElement).setView(center, zoom);

    this.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    const bounds = this.L.latLngBounds([]);

    const customIcon = this.L.icon({
        iconUrl: '/images/marker-icon.png',
        shadowUrl: '/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
    });

    this.immobiles.forEach((immobile) => {
      const marker = this.L.marker([immobile.latitude, immobile.longitude], { icon: customIcon })
        .addTo(this.map)
        .bindPopup(`
          <div style="display:flex; flex-direction:column; gap:10px;">
            <img style="width:100%; border-radius:6px; object-fit:cover;" src=${immobile.img} alt="foto do imóvel no mapa"/>
            <strong>${immobile.title}</strong>
          </div>`
        );
      bounds.extend(marker.getLatLng());
    });

    if (this.immobiles.length > 1) {
      this.map.fitBounds(bounds, { padding: [20, 20] });
    }

    setTimeout(() => this.map.invalidateSize(), 300);
  }

  ngOnDestroy() {
    if (this.map) {
      this.map.remove();
    }
  }
}