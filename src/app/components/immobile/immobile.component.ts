import { NgFor, NgIf, NgOptimizedImage, isPlatformBrowser } from '@angular/common';
import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
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
  faPhoneAlt,
} from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { GET_SINGLE_IMMOBILE } from '../../../graphql/immobiles-query';

import { Lightbox, LightboxModule, IAlbum } from 'ngx-lightbox';

@Component({
  selector: 'app-immobile',
  imports: [NgOptimizedImage, FontAwesomeModule, LightboxModule, NgFor, NgIf],
  standalone: true,
  templateUrl: './immobile.component.html',
  styleUrls: ['./immobile.component.scss'], // corrigido: styleUrls (plural)
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

  immobile: any;
  mapLoaded = false;

  // Álbum para lightbox
  album: IAlbum[] = [];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private route: ActivatedRoute,
    private apollo: Apollo,
    private lightbox: Lightbox // Injeta o Lightbox
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngAfterViewInit() {
    if (!this.isBrowser) return; // só roda no browser

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.apollo
        .watchQuery({
          query: GET_SINGLE_IMMOBILE,
          variables: { id },
        })
        .valueChanges.subscribe((result: any) => {
          this.immobile = result?.data?.immobile;

          // Criar álbum só no browser
          this.createAlbum();

          if (this.immobile?.latitude && this.immobile?.longitude) {
            this.loadMap(this.immobile.latitude, this.immobile.longitude, this.immobile.title);
          }
        });
    }
  }

  createAlbum() {
    this.album = [];

    if (!this.isBrowser) return; // evita erro no SSR

    if (this.immobile?.img) {
      this.album.push({
        src: this.immobile.img,
        thumb: this.immobile.img,
        caption: this.immobile.title || '',
      });
    }

    if (this.immobile?.perspectiveImgs?.length) {
      for (const img of this.immobile.perspectiveImgs) {
        this.album.push({
          src: img,
          thumb: img,
          caption: this.immobile.title || '',
        });
      }
    }
  }

  lightboxIsOpen = false;

  open(index: number): void {
    if (!this.isBrowser) return;
    this.lightboxIsOpen = true;
    this.lightbox.open(this.album, index);
  }

  close(): void {
    if (!this.isBrowser) return;
    this.lightbox.close();
    this.lightboxIsOpen = false;
  }

  async loadMap(lat: number, lng: number, title: string) {
    if (!this.isBrowser) return;

    const L = await import('leaflet');
    const map = L.map('map').setView([lat, lng], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    L.marker([lat, lng])
      .addTo(map)
      .bindPopup(title || 'Imóvel')
      .openPopup();

    this.mapLoaded = true;
  }
}