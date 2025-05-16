import { Component, AfterViewInit, ViewChild, ElementRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faMapMarkerAlt, 
  faBed, 
  faBath, 
  faVectorSquare, 
  faArrowLeft, 
  faArrowRight 
} from '@fortawesome/free-solid-svg-icons';

import { Apollo } from 'apollo-angular';
import { GET_IMMOBILES } from '../../../../graphql/immobiles-query';

@Component({
  selector: 'app-immobiles',
  standalone:true,
  imports: [NgOptimizedImage, FontAwesomeModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './immobiles.component.html',
  styleUrl: './immobiles.component.scss'
})
export class ImmobilesComponent implements AfterViewInit {
  @ViewChild('swiperRef', { static: true }) swiperRef!: ElementRef;
  @ViewChild('prevEl', { static: true }) prevEl!: ElementRef;
  @ViewChild('nextEl', { static: true }) nextEl!: ElementRef;

  faMapMarker = faMapMarkerAlt;
  faBed = faBed;
  faBath = faBath;
  faVectorSquare = faVectorSquare;
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;

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

  ngAfterViewInit(): void {
    const swiperEl = this.swiperRef.nativeElement;

    swiperEl.setAttribute('navigation-prev-el', `.${this.prevEl.nativeElement.classList[1]}`);
    swiperEl.setAttribute('navigation-next-el', `.${this.nextEl.nativeElement.classList[1]}`);
  }
}