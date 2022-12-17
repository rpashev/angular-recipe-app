import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { addToAuthored, updateUserLocalStorage } from 'src/app/+store/actions';
import { RecipeApiService } from 'src/app/services/recipe.service';
import { UserApiService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.scss'],
})
export class CreateRecipeComponent {
  recipeForm!: FormGroup;
  loading = false;
  error: null | string = null;

  constructor(
    private router: Router,
    private recipeApi: RecipeApiService,
    private fb: FormBuilder,
    private store: Store,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.recipeForm = this.fb.group({
      title: [null, [Validators.required, Validators.maxLength(100)]],
      summary: [null, [Validators.required, Validators.maxLength(2000)]],
      imageUrl: [null, Validators.required],
      tags: [null, Validators.required],
      prepTime: [null, Validators.required],
      cookTime: [null, Validators.required],
      servings: [null, Validators.required],
      ingredients: this.fb.array([]),
      directions: [null, Validators.required],
    });
  }

  get ingredients(): FormArray {
    return this.recipeForm.controls['ingredients'] as FormArray;
  }

  onSubmit() {
    if (this.recipeForm.valid) {
      this.loading = true;
      this.error = null;
      const data = {
        ...this.recipeForm.value,
        ingredients: this.ingredients.value.map((ing: any) => ing?.name),
        tags: this.recipeForm.value.tags.split(','),
      };
      this.recipeApi.createRecipe(data).subscribe({
        next: (res: any) => {
          this.loading = false;

          this.store.dispatch(addToAuthored(res?._id));
          this.store.dispatch(updateUserLocalStorage());
          this.router.navigate(['/authored']);
        },
        error: (error) => {
          console.log(error);
          this.error = error.error?.message || 'Something went wrong!';
          this.loading = false;
          this.snackbar.open(this.error as any, '', {
            duration: 3000,
            panelClass: ['my-error-snackbar'],
          });
        },
      });
    }
  }
  addIngredientInput() {
    let ingredientFormGroup = this.fb.group({
      name: [null],
    }) as FormGroup;

    this.ingredients.push(ingredientFormGroup);
  }
}
