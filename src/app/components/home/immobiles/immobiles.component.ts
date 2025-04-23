import { Component } from '@angular/core';
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
  templateUrl: './immobiles.component.html',
  styleUrl: './immobiles.component.scss'
})
export class ImmobilesComponent {
  faMapMarker = faMapMarkerAlt;
  faBed = faBed;
  faBath = faBath;
  faVectorSquare = faVectorSquare;
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;
}
