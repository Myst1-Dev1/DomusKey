import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-filter',
  imports: [FontAwesomeModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
  faSearch = faSearch;

  constructor(private router: Router) {}

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
