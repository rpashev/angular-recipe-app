import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { IMainState } from 'src/app/+store';
import { addToFavorites, updateUserLocalStorage } from 'src/app/+store/actions';
import { IRecipeMain } from 'src/app/interfaces';
import { RecipeApiService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent {
  id!: string;
  loading = false;
  error: null | string = null;
  recipe!: IRecipeMain | null;

  constructor(
    private snackbar: MatSnackBar,
    private route: ActivatedRoute,
    private recipeApi: RecipeApiService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['recipeId'];
    });

    this.getSingleRecipe();
  }

  getSingleRecipe() {
    this.loading = true;
    this.error = null;
    this.recipeApi.getSingleRecipe(this.id).subscribe({
      next: (res: any) => {
        this.recipe = res;
        console.log(this.recipe);
        this.loading = false;
      },
      error: (error) => {
        this.error = error.error?.message || 'Could not load recipe!';
        this.loading = false;
        this.snackbar.open(this.error as any, '', {
          duration: 3000,
          panelClass: ['my-error-snackbar'],
        });
      },
    });
  }

  onAddToFavorites() {
    this.error = null;
    this.recipeApi.addToFavorites(this.id).subscribe({
      next: () => {
        this.store.dispatch(addToFavorites({ id: this.id }));
        this.store.dispatch(updateUserLocalStorage());
        this.snackbar.open('Added to favorites!', '', {
          // duration: 3000,
          panelClass: ['my-success-snackbar'],
        });
      },
      error: (error: any) => {
        console.log(error);
        this.error = error.error?.message || 'Could not add to favorites!';
        this.snackbar.open(this.error as any, '', {
          duration: 3000,
          panelClass: ['my-error-snackbar'],
        });
      },
    });
  }
}
