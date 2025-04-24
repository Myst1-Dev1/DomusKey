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

@Component({
  selector: 'app-immobiles',
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

  immobiles = [
    {
      img: '/images/property.webp',
      title:'Tasman Aris Estate',
      location: 'São Gonçalo - RJ',
      bedNumbers:'4',
      bathNumbers: '3',
      propertySize: '410'
    },
    {
      img: '/images/property.webp',
      title:'Tasman Aris Estate',
      location: 'São Gonçalo - RJ',
      bedNumbers:'4',
      bathNumbers: '3',
      propertySize: '410'
    },
    {
      img: '/images/property.webp',
      title:'Tasman Aris Estate',
      location: 'São Gonçalo - RJ',
      bedNumbers:'4',
      bathNumbers: '3',
      propertySize: '410'
    },
    {
      img: '/images/property.webp',
      title:'Tasman Aris Estate',
      location: 'São Gonçalo - RJ',
      bedNumbers:'4',
      bathNumbers: '3',
      propertySize: '410'
    },
  ]

  ngAfterViewInit(): void {
    const swiperEl = this.swiperRef.nativeElement;

    swiperEl.setAttribute('navigation-prev-el', `.${this.prevEl.nativeElement.classList[1]}`);
    swiperEl.setAttribute('navigation-next-el', `.${this.nextEl.nativeElement.classList[1]}`);
  }
}