import { isPlatformBrowser, NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AfterViewInit, Component, Inject, PLATFORM_ID } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBath, faBed, faMapMarkerAlt, faSearch, faVectorSquare } from '@fortawesome/free-solid-svg-icons';
import { MapComponent } from "./map/map.component";

import { Apollo } from 'apollo-angular';
import { GET_IMMOBILES } from '../../../graphql/immobiles-query';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-immobiles-page',
  imports: [NgOptimizedImage, FormsModule, FontAwesomeModule, MapComponent],
  standalone: true,
  templateUrl: './immobiles-page.component.html',
  styleUrl: './immobiles-page.component.scss'
})
export class ImmobilesPageComponent implements AfterViewInit {
  faMapMarker = faMapMarkerAlt;
  faBed = faBed;
  faBath = faBath;
  faVectorSquare = faVectorSquare;
  faSearch = faSearch;

  immobiles: any[] = [];
  loading = true;
  error: any;

  searchFor: string = '';
  type: string = '';
  price: number = 0;
  location: string = '';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private apollo: Apollo,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      // Preenche os campos com os valores da URL
      this.searchFor = params['search'] || '';
      this.type = params['type'] || '';
      this.price = +params['price'] || 0;
      this.location = params['location'] || '';

      this.apollo.watchQuery<any>({
        query: GET_IMMOBILES,
      }).valueChanges.subscribe(({ data, loading, error }) => {
        this.loading = loading;
        const all = data?.immobiles ?? [];

        // Filtra a lista com base nos filtros preenchidos
        this.immobiles = all.filter((immobile: any) => {
          const matchSearch = this.searchFor ? immobile.title?.toLowerCase().includes(this.searchFor.toLowerCase()) : true;
          const matchType = this.type ? immobile.immobileType === this.type : true;
          const matchPrice = this.price ? immobile.price <= this.price : true;
          const matchLocation = this.location
          ? immobile.location?.toLowerCase() === this.location.toLowerCase()
          : true;

          return matchSearch && matchType && matchPrice && matchLocation;
        });

        this.error = error;
      });
    });
  }

  applyFilter(): void {
    const query = {
      search: this.searchFor,
      type: this.type,
      price: this.price,
      location: this.location
    };

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: query,
      queryParamsHandling: 'merge'
    });
  }

  trackByLocation(_: number, item: any) {
    return item?.location;
  }

  animateUI() {
    const tlFilter = gsap.timeline({ defaults: { ease: 'sine', duration: 0.5, stagger: 0.4 } });
    const tlImmobile = gsap.timeline({ defaults: { ease: 'sine', duration: 0.5, stagger: 0.4 } });

    tlFilter.fromTo('.input-box', { opacity: 0, x: -40 }, { opacity: 1, x: 0 });
    tlFilter.fromTo('.filter-btn', { opacity: 0, scale: 0 }, { opacity: 1, scale: 1.1 });

    tlImmobile.fromTo('.immobile-box img', {
      opacity: 0,
      x: -100,
      rotateY: -45,
      transformPerspective: 1000,
      transformOrigin: "left center"
    }, {
      opacity: 1,
      x: 0,
      rotateY: 0
    });
    tlImmobile.fromTo('.immobile-box .info-box h2', { opacity:0, x:-30 }, { opacity:1, x:0 });
    tlImmobile.fromTo('.immobile-box .info-box .location-box', { opacity:0, x:-30 }, { opacity:1, x:0 });
    tlImmobile.fromTo('.immobile-box .info-box p', { opacity:0, y:-30 }, { opacity:1, y:0 });
    tlImmobile.fromTo('.immobile-box .info-box .price', { opacity:0, scaleY:0 }, { opacity:1, scaleY:1.1 });
    tlImmobile.fromTo('.immobile-box .info-box .immobile-services .box', { opacity:0, scaleX:0 }, { opacity:1, scaleX:1.1 });
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const checkLoaded = setInterval(() => {
        if (!this.loading && this.immobiles.length > 0) {
          clearInterval(checkLoaded);
          this.animateUI();
        }
      }, 100);
    }
  }

  get uniqueLocations() {
    return [...new Set(this.immobiles.map(i => i.location))];
  }
}