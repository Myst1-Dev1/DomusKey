import { AfterViewInit, Component, ElementRef, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { FilterComponent } from "./filter/filter.component";
import { VideoComponent } from "./video/video.component";
import { ImmobilesComponent } from "./immobiles/immobiles.component";
import { ContactComponent } from "./contact/contact.component";
import { FaqComponent } from "./faq/faq.component";
import gsap from "gsap";

@Component({
  selector: 'app-home',
  imports: [
    FilterComponent,
    VideoComponent,
    ImmobilesComponent,
    ContactComponent,
    FaqComponent
],
  standalone:true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit {

  @ViewChild('titleRef', { static:true }) h2!: ElementRef;
  @ViewChild('box', { static: true }) box!: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      gsap.from(this.h2.nativeElement, {
        duration:0.4,
        delay:0.8,
        x:-100,
        opacity:0,
        ease: 'sine'
      });

      gsap.from(this.box.nativeElement, {
        duration:0.4,
        delay:0.8,
        x:100,
        opacity:0,
        ease:'sine'
      });
    }
  }
}
