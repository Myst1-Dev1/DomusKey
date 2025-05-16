import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBath, faBed, faMapMarkerAlt, faSearch, faVectorSquare } from '@fortawesome/free-solid-svg-icons';
import { MapComponent } from "./map/map.component";

import { Apollo } from 'apollo-angular';
import { GET_IMMOBILES } from '../../../graphql/immobiles-query';

@Component({
  selector: 'app-immobiles-page',
  imports: [NgOptimizedImage, FontAwesomeModule, MapComponent],
  standalone:true,
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

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.apollo.watchQuery<any>({
      query: GET_IMMOBILES,
    }).valueChanges.subscribe(({ data, loading, error }) => {
      this.loading = loading;
      this.immobiles = data?.immobiles ?? [];
      this.error = error;
    });
  }
}
