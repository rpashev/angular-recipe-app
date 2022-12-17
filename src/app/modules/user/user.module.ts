import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesComponent } from './favorites/favorites.component';
import { AuthoredComponent } from './authored/authored.component';
import { RecipeUserCardComponent } from './recipe-user-card/recipe-user-card.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    FavoritesComponent,
    AuthoredComponent,
    RecipeUserCardComponent,
  ],
  imports: [CommonModule, SharedModule],
})
export class UserModule {}
