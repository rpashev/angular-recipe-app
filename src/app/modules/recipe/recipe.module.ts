import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateRecipeComponent } from './create-recipe/create-recipe.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';
import { DetailsComponent } from './details/details.component';
import { RecipeCardComponent } from './recipe-card/recipe-card.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CreateRecipeComponent,
    EditRecipeComponent,
    DetailsComponent,
    RecipeCardComponent,
  ],
  imports: [CommonModule, SharedModule],
  exports: [RecipeCardComponent],
})
export class RecipeModule {}
