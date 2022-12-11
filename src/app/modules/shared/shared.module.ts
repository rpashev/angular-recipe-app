import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatInputModule,
  ],
  exports: [MatProgressSpinnerModule, MatButtonModule, MatInputModule],
})
export class SharedModule {}
