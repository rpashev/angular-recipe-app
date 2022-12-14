import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { TagBadgeComponent } from './tag-badge/tag-badge.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { FilterPipe } from './filter.pipe';

@NgModule({
  declarations: [TagBadgeComponent, FilterPipe],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatChipsModule,
    MatSnackBarModule,
    MatSelectModule,
    MatIconModule,
  ],
  exports: [
    MatProgressSpinnerModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatChipsModule,
    MatSnackBarModule,
    MatSelectModule,
    MatIconModule,
    FilterPipe,
  ],
})
export class SharedModule {}
