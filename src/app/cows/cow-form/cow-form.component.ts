import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators , FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CowService } from '../cow.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-cow-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatCardModule,
       ReactiveFormsModule,RouterLink],
  templateUrl: './cow-form.component.html',
  styleUrl: './cow-form.component.scss'
})
export class CowFormComponent {
  constructor(private fb: FormBuilder, private cowService: CowService, private router: Router) {}
  cowForm!: FormGroup; 
  ngOnInit() {
    this.cowForm = this.fb.group({
      tag: ['', Validators.required],
      sex: ['', Validators.required],
      pen: ['', Validators.required],
      status: ['Active', Validators.required],
      weight: [null, Validators.min(1)]
    });
  }

onSubmit() {
  if (this.cowForm.invalid) return;

  const formValue = this.cowForm.value;
  const exists = this.cowService.findCow(formValue.tag);
  if (exists) {
    alert('Ear tag must be unique');
    return;
  }

  this.cowService.addCow({
    ...formValue,
    lastEventDate: new Date(),
    events: [
      {
        date: new Date(),
        description: 'Cow registered'
      }
    ]
  });

  this.cowForm.reset({
    status: 'Active'
  });

  this.router.navigate(['/']);
}

}
