import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CowService } from '../cow.service';
import { Cow } from '../cow.model';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import {  RouterLink } from '@angular/router';
@Component({
  selector: 'app-cow-detail',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
          MatButtonModule,
          MatCardModule,
          MatToolbarModule,MatIconModule,MatTableModule, DatePipe, NgIf, NgFor, CommonModule,RouterLink],
  templateUrl: './cow-detail.component.html',
  styleUrl: './cow-detail.component.scss'
})
export class CowDetailComponent {
cow?: Cow;
eventColumns: string[] = ['date', 'description'];

getStatusClass(status: string): string {
  return 'status-' + status.toLowerCase().replace(/\s/g, '-');
}

  constructor(private route: ActivatedRoute, private cowService: CowService) {}

  ngOnInit() {
    const tag = this.route.snapshot.paramMap.get('tag');
    if (tag) this.cow = this.cowService.findCow(tag);
  }

}
