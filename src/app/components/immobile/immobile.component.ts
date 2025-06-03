import { NgFor, NgIf, NgOptimizedImage, isPlatformBrowser } from '@angular/common';
import { Component, AfterViewInit, Inject, PLATFORM_ID, HostListener } from '@angular/core';
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

import gsap from 'gsap';

@Component({
  selector: 'app-immobile',
  imports: [NgOptimizedImage, FontAwesomeModule, LightboxModule, NgFor, NgIf],
  standalone: true,
  templateUrl: './immobile.component.html',
  styleUrls: ['./immobile.component.scss'],
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
  loading = true;
  mapLoaded = false;

  album: IAlbum[] = [];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private route: ActivatedRoute,
    private apollo: Apollo,
    private lightbox: Lightbox
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  animateUI() {
    const tlImmobile = gsap.timeline({ defaults: { ease: 'power2.out', duration: 0.8 } });
    const tlImmobileDetails = gsap.timeline({ defaults: { ease: 'power2.out', duration: 0.8 } });

    tlImmobile.fromTo(
      '.immobile-container .immobile-box .img-container img',
      { opacity: 0, scale: 0 },
      { opacity: 1, scale: 1 }
    );
    tlImmobile.fromTo(
      '.immobile-container .immobile-box .img-container .other-img-box img',
      { opacity: 0, scaleX: 0.95 },
      { opacity: 1, scaleX: 1 }
    );
    tlImmobile.fromTo('.immobile-container .immobile-box .immobile-info .box h2', { opacity:0, y:-30 }, { opacity:1, y:0 });
    tlImmobile.fromTo('.immobile-container .immobile-box .immobile-info .box .location', { opacity:0, y:-30 }, { opacity:1, y:0 });
    tlImmobile.fromTo('.immobile-container .immobile-box .immobile-info .box .price', { opacity:0, scaleX:0 }, { opacity:1, scaleX:1.1 });
    tlImmobile.fromTo('.immobile-container .immobile-box .immobile-info .broker-box', { opacity:0, x:-30 }, { opacity:1, x:0 });
    tlImmobile.fromTo('.immobile-container .immobile-box p', { opacity:0, y:30 }, { opacity:1, y:0 });

    tlImmobileDetails.fromTo('.immobile-details', { opacity:0, x:30 }, { opacity:1, x:0 });
    tlImmobileDetails.fromTo('.immobile-details .general', { opacity:0, y:30 }, { opacity:1, y:0 });
    tlImmobileDetails.fromTo('.immobile-details .map-box', { opacity:0, y:30 }, { opacity:1, y:0 });
  }

  ngAfterViewInit() {
  if (!this.isBrowser) return;

  const id = this.route.snapshot.paramMap.get('id');

  if (id) {
    this.apollo
      .watchQuery({
        query: GET_SINGLE_IMMOBILE,
        variables: { id },
      })
      .valueChanges.subscribe((result: any) => {
        this.immobile = result?.data?.immobile || [];

        this.loading = false;

        this.createAlbum();

        if (this.immobile?.latitude && this.immobile?.longitude) {
          this.loadMap(this.immobile.latitude, this.immobile.longitude, this.immobile.title);
        }

        setTimeout(() => {
          this.animateUI();
        }, 100);
      });
  }

  document.addEventListener('click', this.handleDocumentClick.bind(this), true);
}

  createAlbum() {
    this.album = [];

    if (!this.isBrowser) return;

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

  handleDocumentClick(event: MouseEvent): void {
  if (!this.lightboxIsOpen) return;

  const target = event.target as HTMLElement;

  if (
    target.closest('.lb-container') &&
    !target.closest('.lb-image') &&
    !target.closest('.lb-nav') &&
    !target.closest('.lb-dataContainer')
  ) {
    this.close();
  }
}

  async loadMap(lat: number, lng: number, title: string) {
      if (!this.isBrowser) return;

      const leafletModule = await import('leaflet');
      const L = leafletModule.default;

      const map = L.map('map').setView([lat, lng], 15);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(map);

      const customIcon = L.icon({
        iconUrl: '/images/marker-icon.png',
        shadowUrl: '/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });

      L.marker([lat, lng], { icon: customIcon })
        .addTo(map)
        .bindPopup(title || 'Imóvel')
        .openPopup();

      this.mapLoaded = true;
  }
}