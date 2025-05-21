import { AfterViewInit, Component, ElementRef, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Apollo } from 'apollo-angular';
import { GET_IMMOBILES } from '../../../../graphql/immobiles-query';
import gsap from "gsap";

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent implements AfterViewInit {
  faSearch = faSearch;

  immobiles: any[] = [];

  @ViewChild('filterContainer', { static:true }) filterContainer!: ElementRef;
  @ViewChild('inputContainer', { static:true }) inputContainer!: ElementRef;
  @ViewChild('buttonRef', { static:true }) buttonRef!: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private router: Router, private apollo: Apollo,) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {

        gsap.from(this.filterContainer.nativeElement, {
          duration: 0.6,
          opacity: 0,
          y: -50,
          ease: 'sine',
          delay:0.4
        });

        gsap.from(this.inputContainer.nativeElement, {
          duration:0.6,
          opacity:0,
          y:-20,
          ease: 'sine'
        });

        gsap.from(this.buttonRef.nativeElement, {
          duration: 0.6,
          scale: 0,
          ease: 'sine'
        });
    }
  }

  ngOnInit(): void {
    this.apollo.watchQuery<any>({
            query: GET_IMMOBILES,
          }).valueChanges.subscribe(({ data }) => {
            const all = data?.immobiles ?? [];
            this.immobiles = all;
    });
  }

  search() {
    const filters = {
      search: (document.getElementById('search-for') as HTMLInputElement)?.value || '',
      type: (document.getElementById('type') as HTMLSelectElement)?.value || '',
      price: (document.getElementById('price') as HTMLInputElement)?.value || '',
      location: (document.getElementById('location') as HTMLSelectElement)?.value || '',
    };

    this.router.navigate(['/imoveis'], {
      queryParams: filters
    });
  }
}
