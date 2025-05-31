import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-video',
  standalone: true,
  templateUrl: './video.component.html',
  styleUrl: './video.component.scss'
})
export class VideoComponent implements AfterViewInit {
  @ViewChild('videoRef', { static: true }) videoRef!: ElementRef<HTMLVideoElement>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {

      const video = this.videoRef.nativeElement;

      ScrollTrigger.create({
        trigger: video,
        start: 'top 90%',
        once: true,
        onEnter: () => {
          gsap.from(video, {
            opacity: 0,
            duration: 0.6,
            ease: 'sine',
            delay: 0.4
          });

          video.play().catch(err => console.warn('Play bloqueado:', err));
        }
      });
    }
  }
}