import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Apollo } from 'apollo-angular';
import { GET_IMMOBILES } from '../../../../graphql/immobiles-query';

@Component({
  selector: 'app-filter',
  imports: [FontAwesomeModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
  faSearch = faSearch;

  immobiles: any[] = [];

  constructor(private router: Router, private apollo: Apollo,) {}

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
