import { NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBath, faBed, faMapMarkerAlt, faSearch, faVectorSquare } from '@fortawesome/free-solid-svg-icons';
import { MapComponent } from "./map/map.component";

import { Apollo } from 'apollo-angular';
import { GET_IMMOBILES } from '../../../graphql/immobiles-query';

@Component({
  selector: 'app-immobiles-page',
  imports: [NgOptimizedImage, FormsModule, FontAwesomeModule, MapComponent],
  standalone: true,
  templateUrl: './immobiles-page.component.html',
  styleUrl: './immobiles-page.component.scss'
})
export class ImmobilesPageComponent {
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
          const matchType = this.type ? immobile.type === this.type : true;
          const matchPrice = this.price ? immobile.price <= this.price : true;
          const matchLocation = this.location ? immobile.city?.toLowerCase() === this.location.toLowerCase() : true;

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

  // (Opcional) trackBy para location
  trackByLocation(_: number, item: any) {
    return item?.location;
  }

  get uniqueLocations() {
    return [...new Set(this.immobiles.map(i => i.location))];
  }
}