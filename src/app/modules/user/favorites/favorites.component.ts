import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import {
  removeFromFavorites,
  updateUserLocalStorage,
} from 'src/app/+store/actions';
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
  constructor(
    private store: Store,
    private recipeApi: RecipeApiService,
    private snackbar: MatSnackBar
  ) {}

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
        this.snackbar.open(this.error as any, '', {
          duration: 3000,
          panelClass: ['my-error-snackbar'],
        });
      },
    });
  }

  onRemovedFromFavorites(id: string) {
    this.recipes = this.recipes.filter((r) => r._id !== id);
    this.store.dispatch(removeFromFavorites({ id }));
    this.store.dispatch(updateUserLocalStorage());
  }
}
