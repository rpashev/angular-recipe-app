import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { TagBadgeComponent } from './tag-badge/tag-badge.component';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  declarations: [TagBadgeComponent],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatChipsModule,
  ],
  exports: [
    MatProgressSpinnerModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatChipsModule,
  ],
})
export class SharedModule {}
