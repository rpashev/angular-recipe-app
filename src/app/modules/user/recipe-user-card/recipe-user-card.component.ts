import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RecipeApiService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-user-card',
  templateUrl: './recipe-user-card.component.html',
  styleUrls: ['./recipe-user-card.component.scss'],
})
export class RecipeUserCardComponent {
  @Input() summary!: string;
  @Input() imageUrl!: string;
  @Input() title!: string;
  @Input() id!: string;
  @Input() isAuthor: boolean = false;
  @Input() isFavorite: boolean = false;
  @Output() onRemovedFromFavorites = new EventEmitter();
  @Output() onDeletedAuthored = new EventEmitter();
  loading = false;
  error: string | null = null;

  constructor(
    private recipeApi: RecipeApiService,
    private snackbar: MatSnackBar
  ) {}

  onRemoveFromFavorites() {
    console.log('hi');
    this.loading = true;
    this.error = null;
    this.recipeApi.removeFromFavorites(this.id).subscribe({
      next: (response: any) => {
        console.log(response);
        this.loading = false;
        this.onRemovedFromFavorites.emit(this.id);
        this.snackbar.open('Removed from favorites!', '', {
          duration: 3000,
          panelClass: ['my-success-snackbar'],
        });
      },
      error: (error: any) => {
        console.log(error);
        this.error = error.error?.message || 'Could not remove from favorites!';
        this.snackbar.open(this.error as any, '', {
          duration: 3000,
          panelClass: ['my-error-snackbar'],
        });
        this.loading = false;
      },
    });
  }

  onDeleteRecipe() {
    this.loading = true;
    this.error = null;
    this.recipeApi.deleteRecipe(this.id).subscribe({
      next: (response: any) => {
        console.log(response);
        this.loading = false;
        this.onDeletedAuthored.emit(this.id);
        this.snackbar.open('Recipe deleted succesfully!', '', {
          duration: 3000,
          panelClass: ['my-success-snackbar'],
        });
      },
      error: (error: any) => {
        console.log(error);
        this.error = error.error?.message || 'Could not delete recipe!';
        this.snackbar.open(this.error as any, '', {
          duration: 3000,
          panelClass: ['my-error-snackbar'],
        });
        this.loading = false;
      },
    });
  }
}
