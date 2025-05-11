import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBath, faBed, faMapMarkerAlt, faSearch, faVectorSquare } from '@fortawesome/free-solid-svg-icons';
import { MapComponent } from "./map/map.component";

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

   immobiles = [
    {
      img: '/images/property.webp',
      title:'Tasman Aris Estate',
      location: 'São Gonçalo - RJ',
      description:"Lorem ipsum dolor sit amet consectetur adipisicing and about this immobile of Domus Key.",
      price:'1500',
      bedNumbers:'4',
      bathNumbers: '3',
      propertySize: '410'
    },
    {
      img: '/images/property.webp',
      title:'Tasman Aris Estate',
      location: 'São Gonçalo - RJ',
      description:"Lorem ipsum dolor sit amet consectetur adipisicing and about this immobile of Domus Key.",
      price:'1500',
      bedNumbers:'4',
      bathNumbers: '3',
      propertySize: '410'
    },
    {
      img: '/images/property.webp',
      title:'Tasman Aris Estate',
      location: 'São Gonçalo - RJ',
      description:"Lorem ipsum dolor sit amet consectetur adipisicing and about this immobile of Domus Key.",
      price:'1500',
      bedNumbers:'4',
      bathNumbers: '3',
      propertySize: '410'
    },
    {
      img: '/images/property.webp',
      title:'Tasman Aris Estate',
      location: 'São Gonçalo - RJ',
      description:"Lorem ipsum dolor sit amet consectetur adipisicing and about this immobile of Domus Key.",
      price:'1500',
      bedNumbers:'4',
      bathNumbers: '3',
      propertySize: '410'
    },
    {
      img: '/images/property.webp',
      title:'Tasman Aris Estate',
      location: 'São Gonçalo - RJ',
      description:"Lorem ipsum dolor sit amet consectetur adipisicing and about this immobile of Domus Key.",
      price:'1500',
      bedNumbers:'4',
      bathNumbers: '3',
      propertySize: '410'
    }
   ]
}
