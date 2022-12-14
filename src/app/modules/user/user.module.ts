import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesComponent } from './favorites/favorites.component';
import { AuthoredComponent } from './authored/authored.component';



@NgModule({
  declarations: [
    FavoritesComponent,
    AuthoredComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UserModule { }
