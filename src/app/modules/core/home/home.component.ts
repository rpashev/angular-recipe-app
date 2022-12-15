import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getAuthored, getEmail } from 'src/app/+store/selectors';
import { IRecipeMain } from 'src/app/interfaces';
import { RecipeApiService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  email$ = this.store.select(getAuthored);
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

    this.recipeApi.getAllRecipes().subscribe({
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
