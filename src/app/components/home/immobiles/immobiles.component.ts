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

import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-immobiles',
  standalone:true,
  imports: [NgOptimizedImage, FontAwesomeModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './immobiles.component.html',
  styleUrl: './immobiles.component.scss'
})
export class ImmobilesComponent implements AfterViewInit {
  @ViewChild('swiperRef', { static: false }) swiperRef!: ElementRef;
  @ViewChild('prevEl', { static: false }) prevEl!: ElementRef;
  @ViewChild('nextEl', { static: false }) nextEl!: ElementRef;

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

      // Atribuir manualmente as setas
      swiperEl.navigation = {
        prevEl: this.prevEl.nativeElement,
        nextEl: this.nextEl.nativeElement
      };

      // Inicializar o Swiper APÓS as props estarem setadas
      swiperEl.initialize();

      ScrollTrigger.create({
        trigger: '#immobiles',
        start: 'top 90%',
        once: true,
        onEnter: () => {
          const tl = gsap.timeline({ defaults: { ease: 'sine', duration: 0.8, stagger: 0.4 } });

          tl.fromTo('.immobileTitle', { opacity: 0, y: 30 }, { opacity: 1, y: 0 });
          tl.fromTo('.immobiles-box', { opacity: 0, x:-30 }, { opacity: 1, x:0 });
          tl.fromTo('.arrow', { opacity: 0 }, { opacity: 1 });
        }
      });
  }
}