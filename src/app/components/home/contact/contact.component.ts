import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, Inject, PLATFORM_ID } from '@angular/core';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements AfterViewInit {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {

      ScrollTrigger.create({
        trigger:'#contact',
        start:'top 90%',
        once:true,
        onEnter:() => {
          const tl = gsap.timeline({ defaults: { ease: 'sine', duration: 0.5, stagger: 0.4 } });

          tl.fromTo('.bg', { opacity:0, y:-50 }, { opacity:1, y:0 });
          tl.fromTo('.form-container', { opacity:0, y:-50 }, { opacity:1, y:0 });
          tl.fromTo('.contact-title', { opacity:0, x:-40 }, { opacity:1, x:0 });
          tl.fromTo('.input-box-contact', { opacity:0, x:-40 }, { opacity:1, x:0 });
          tl.fromTo('.contact-btn', { opacity:0, scale:0 }, { opacity:1, scale:1.1 });
        }
      })
    }
  }
}
