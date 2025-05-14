import { NgOptimizedImage, isPlatformBrowser } from '@angular/common';
import { Component, AfterViewInit, Inject, PLATFORM_ID  } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faMapMarkerAlt, 
  faPaw, 
  faMoneyCheckDollar, 
  faTools, 
  faBed, 
  faBath, 
  faExpand,
  faSchool,
  faBus,
  faUtensils,
  faPhoneAlt
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-immobile',
  imports: [NgOptimizedImage, FontAwesomeModule],
  standalone:true,
  templateUrl: './immobile.component.html',
  styleUrl: './immobile.component.scss'
})
export class ImmobileComponent implements AfterViewInit {
    faMapMarker = faMapMarkerAlt;
    faPaw = faPaw;
    faMoneyCheckDollar = faMoneyCheckDollar;
    faTools = faTools;
    faBed = faBed;
    faBath = faBath;
    faExpand = faExpand;
    faSchool = faSchool;
    faBus = faBus;
    faUtensils = faUtensils;
    faPhoneAlt = faPhoneAlt;

    private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  async ngAfterViewInit() {
    if (this.isBrowser) {
      const L = await import('leaflet');
      const map = L.map('map').setView([-22.8268, -43.0634], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      L.marker([-22.8268, -43.0634]).addTo(map)
        .bindPopup('Tasman Aris State')
        .openPopup();
    }
  }
}
