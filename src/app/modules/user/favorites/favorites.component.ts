import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { IRecipeMain } from 'src/app/interfaces';
import { RecipeApiService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent {
  loading = false;
  error: string | null = null;
  recipes!: IRecipeMain[];
  constructor(private store: Store, private recipeApi: RecipeApiService) {}

  ngOnInit() {
    this.loadRecipes();
  }
  loadRecipes() {
    this.loading = true;
    this.error = null;

    this.recipeApi.getFavorites().subscribe({
      next: (response) => {
        console.log(response);
        this.recipes = response as any;
        this.loading = false;
      },
      error: (error) => {
        console.log(error);
        this.error = error.error?.message || 'Could not load recipes!';
        this.loading = false;
      },
    });
  }
}
