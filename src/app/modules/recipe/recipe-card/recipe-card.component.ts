import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { addToFavorites, updateUserLocalStorage } from 'src/app/+store/actions';
import { getFavorites, getisLoggedIn } from 'src/app/+store/selectors';
import { RecipeApiService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss'],
})
export class RecipeCardComponent {
  @Input() tags!: string[];
  @Input() imageUrl!: string;
  @Input() title!: string;
  @Input() id!: string;
  loading = false;
  error: string | null = null;
  isInFavorites!: boolean;
  isLoggedIn!: boolean;

  constructor(
    private store: Store,
    private recipeApi: RecipeApiService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.store.select(getFavorites).subscribe((favs) => {
      if (favs.includes(this.id)) {
        this.isInFavorites = true;
      } else {
        this.isInFavorites = false;
      }
    });

    this.store
      .select(getisLoggedIn)
      .subscribe((flag) => (this.isLoggedIn = flag));
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
          duration: 3000,
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
  navigateToDetailsPage() {
    this.router.navigate([`details/${this.id}`]);
  }
}
