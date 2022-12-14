import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { IRecipeMain } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class RecipeApiService {
  baseUrl = environment.baseURL;

  constructor(private http: HttpClient, private store: Store) {}

  getAllRecipes() {
    const url = this.baseUrl + 'recipes';
    return this.http.get(url);
  }

  getFavorites() {
    const url = this.baseUrl + 'users/favorites';
    return this.http.get(url);
  }

  getAuthored() {
    const url = this.baseUrl + 'users/authored';
    return this.http.get(url);
  }

  getSingleRecipe(recipeId: string) {
    const url = this.baseUrl + 'recipes/' + recipeId;
    return this.http.get(url);
  }
  createRecipe(recipe: IRecipeMain) {
    const url = this.baseUrl + 'recipes';
    return this.http.post(url, recipe);
  }
  updateRecipe(recipe: IRecipeMain, recipeId: string) {
    const url = this.baseUrl + 'recipes/' + recipeId;
    return this.http.put(url, recipe);
  }

  deleteRecipe(recipeId: string) {
    const url = this.baseUrl + 'recipes/' + recipeId;
    return this.http.delete(url);
  }

  removeFromFavorites(recipeId: string) {
    const url = this.baseUrl + 'users/favorites/' + recipeId;
    return this.http.delete(url);
  }

  addToFavorites(recipeId: string) {
    const url = this.baseUrl + 'users/favorites';
    return this.http.post(url, { recipeId });
  }
}
