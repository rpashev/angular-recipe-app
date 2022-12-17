import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { addToFavorites, updateUserLocalStorage } from 'src/app/+store/actions';
import { RecipeApiService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss'],
})
export class RecipeCardComponent {
  @Input() tags!: string[];
  @Input() img!: string;
  @Input() title!: string;
  @Input() id!: string;
  tagsArr!: string[];
  loading = false;
  error: string | null = null;

  constructor(
    private store: Store,
    private recipeApi: RecipeApiService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.tagsArr = this.tags[0].split(', ');
  }

  onAddToFavorites() {
    this.loading = true;
    this.error = null;
    this.recipeApi.addToFavorites(this.id).subscribe({
      next: (response: any) => {
        console.log(response);
        this.loading = false;
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
        this.loading = false;
      },
    });
  }
}
