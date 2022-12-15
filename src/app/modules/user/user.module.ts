import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesComponent } from './favorites/favorites.component';
import { AuthoredComponent } from './authored/authored.component';
import { RecipeAuthoredCardComponent } from './recipe-authored-card/recipe-authored-card.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    FavoritesComponent,
    AuthoredComponent,
    RecipeAuthoredCardComponent,
  ],
  imports: [CommonModule, SharedModule],
})
export class UserModule {}
