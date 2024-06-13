import { Component, DoCheck } from '@angular/core';
import { SearchBarFilterService} from './search-bar-filter.service';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'search-bar',
  standalone: true,
  imports: [FormsModule, MatButtonModule, MatIcon],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent implements DoCheck {
  constructor(
    private searchFilterService: SearchBarFilterService,
    private location: Location,
  ) {}

  searchTerm = '';
  disableSearch?: boolean;

  //checks whether the page requires a searchbar or not
  ngDoCheck(): void {
    if (
      this.location.path().includes('/path1/') ||
      this.location.path().includes('/path2') ||
      this.location.path().includes('/path2')
    ) {
      this.disableSearch = true;
    } else {
      this.disableSearch = false;
    }
  }

  onSearch() {
    this.searchFilterService.setSearchTerm(this.searchTerm);
  }
}
