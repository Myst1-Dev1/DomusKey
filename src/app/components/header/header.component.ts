import { AfterViewInit, Component, ElementRef, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, NgOptimizedImage } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons'
import gsap from "gsap";

@Component({
  selector: 'app-header',
  imports: [FontAwesomeModule, NgOptimizedImage],
  standalone:true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements AfterViewInit {
  faBars = faBars;

  isMenuOpen = false;

    @ViewChild('header', { static: true }) header!: ElementRef;
    @ViewChild('nav', { static: true }) nav!: ElementRef;
    @ViewChild('line', { static: true }) line!: ElementRef;

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

    ngAfterViewInit() {
      if (isPlatformBrowser(this.platformId)) {
        gsap.from(this.header.nativeElement, {
          duration: 1,
          y: -100,
          opacity: 0,
          ease: 'power3.out'
        });

        gsap.from(this.line.nativeElement, {
          duration: 1,
          width: 0,
          delay: 0.5,
          ease: 'power2.out'
        });
      }
    }

    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;

      // if (isPlatformBrowser(this.platformId)) {
      //   gsap.to(this.nav.nativeElement, {
      //     height: this.isMenuOpen ? 'auto' : 0,
      //     duration: 0.4,
      //     ease: 'power2.inOut'
      //   });
      // }
    }
}
