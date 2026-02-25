import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CowService } from '../cow.service';
import { Cow } from '../cow.model';
import { Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-cow-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatCardModule
        , MatToolbarModule, MatTableModule, FormsModule, RouterLink, CommonModule],
  templateUrl: './cow-list.component.html',
  styleUrl: './cow-list.component.scss'
})
export class CowListComponent {
  searchTag = '';
  filterStatus = '';
  filterPen = '';
  displayedColumns: string[] = [
    'tag',
    'sex',
    'pen',
    'status',
    'lastEventDate'
  ];

  getStatusClass(status: string): string {
  switch (status) {
    case 'Active':
      return 'status-active';
    case 'In Treatment':
      return 'status-treatment';
    case 'Deceased':
      return 'status-deceased';
    default:
      return '';
  }
}
constructor(private cowService: CowService, private router: Router) {}

filteredCows(): Cow[] {
  const searchTagLower = this.searchTag?.trim().toLowerCase() || '';
  const filterStatusLower = this.filterStatus?.trim().toLowerCase() || '';
  const filterPenLower = this.filterPen?.trim().toLowerCase() || '';

  return this.cowService.getCows().filter(cow => {
    const tagLower = cow.tag.toLowerCase();
    const statusLower = cow.status.toLowerCase();
    const penLower = cow.pen.toLowerCase();

    return (
      (!searchTagLower || tagLower.includes(searchTagLower)) &&
      (!filterStatusLower || statusLower === filterStatusLower) &&
      (!filterPenLower || penLower.includes(filterPenLower))
    );
  });
}

  viewCow(cow: Cow) {
    this.router.navigate(['/cow', cow.tag]);
  }

  ngOnInit() {
  const saved = localStorage.getItem('cowFilters');
  if (saved) {
    const f = JSON.parse(saved);
    this.searchTag = f.searchTag || '';
    this.filterStatus = f.filterStatus || '';
    this.filterPen = f.filterPen || '';
  }
}

ngOnDestroy() {
  localStorage.setItem('cowFilters', JSON.stringify({
    searchTag: this.searchTag,
    filterStatus: this.filterStatus,
    filterPen: this.filterPen
  }));
}

trackByTag(index: number, cow: Cow) {
  return cow.tag;
}

}
