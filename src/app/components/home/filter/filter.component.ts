import { AfterViewInit, Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Apollo } from 'apollo-angular';
import { GET_IMMOBILES } from '../../../../graphql/immobiles-query';

import gsap from "gsap";
import { ScrollTrigger }from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [FontAwesomeModule, NgFor],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent implements AfterViewInit {
  faSearch = faSearch;

  immobiles: any[] = [];

  uniqueLocation: string[] | any = [];

  // @ViewChild('filterContainer', { static:true }) filterContainer!: ElementRef;
  // @ViewChild('inputContainer', { static:true }) inputContainer!: ElementRef;
  // @ViewChild('buttonRef', { static:true }) buttonRef!: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private router: Router, private apollo: Apollo,) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {

        ScrollTrigger.create({
          trigger:'.filter',
          start:'top 90%',
          once:true,
          onEnter: () => {
            const tl = gsap.timeline({ defaults: { ease: 'sine', duration: 0.5, stagger: 0.4 } });

            tl.from('.filter', {
              opacity: 0,
              y: -50,
            });

            tl.fromTo('.filter-container', {
              opacity:0,
              y:-20,
            }, { opacity:1, y:0 });

            tl.fromTo('.input-box', { opacity:0, x:30 }, { opacity:1, x:0 });

            tl.fromTo('.filter-btn', {
              opacity: 0,
              x:30
            }, { opacity:1, x:0 });
          }
        })
    }
  }

  ngOnInit(): void {
    this.apollo.watchQuery<any>({
        query: GET_IMMOBILES,
      }).valueChanges.subscribe(({ data }) => {
        const all = data?.immobiles ?? [];
        this.immobiles = all;

        this.uniqueLocation = [...new Set(all.map((item:any) => item.location))];
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
