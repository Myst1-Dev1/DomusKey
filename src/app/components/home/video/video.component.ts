import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID, ElementRef, AfterViewInit, ViewChild } from '@angular/core';

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

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            video.play().catch(err => console.warn('Play bloqueado:', err));
          }
        },
        { threshold: 0.5 }
      );

      observer.observe(video);
    }
  }
}