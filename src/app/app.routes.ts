import { Routes } from '@angular/router';
import { CowListComponent } from './cows/cow-list/cow-list.component';
import { CowFormComponent } from './cows/cow-form/cow-form.component';
import { CowDetailComponent } from './cows/cow-detail/cow-detail.component';

export const routes: Routes = [
  { path: '', component: CowListComponent },
  { path: 'add-cow', component: CowFormComponent },
  { path: 'cow/:tag', component: CowDetailComponent }
];
