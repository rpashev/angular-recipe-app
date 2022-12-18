import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { addToAuthored, updateUserLocalStorage } from 'src/app/+store/actions';
import { RecipeApiService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.scss'],
})
export class EditRecipeComponent {
  id!: string;
  recipeForm!: FormGroup;
  loading = false;
  loadingExistingRecipe = false;
  error: null | string = null;
  errorLoadingExisting: null | string = null;
  recipe: any;

  constructor(
    private router: Router,
    private recipeApi: RecipeApiService,
    private fb: FormBuilder,
    private store: Store,
    private snackbar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['recipeId'];
    });

    this.getSingleRecipe();

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

  getSingleRecipe() {
    this.loadingExistingRecipe = true;
    this.errorLoadingExisting = null;
    this.recipeApi.getSingleRecipe(this.id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.patchForm(res);
        this.loadingExistingRecipe = false;
      },
      error: (error) => {
        this.errorLoadingExisting =
          error.error?.message || 'Could not load recipe!';
        this.loadingExistingRecipe = false;
        this.snackbar.open(this.errorLoadingExisting as any, '', {
          duration: 3000,
          panelClass: ['my-error-snackbar'],
        });
      },
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
      console.log(data);
      this.recipeApi.updateRecipe(data, this.id).subscribe({
        next: () => {
          this.loading = false;
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

  patchForm(recipe: any) {
    this.recipeForm.patchValue({
      cookTime: recipe?.cookTime,
      prepTime: recipe?.prepTime,
      servings: recipe?.servings,
      directions: recipe?.directions,
      tags: recipe?.tags.join(','),
      title: recipe?.title,
      summary: recipe?.summary,
      imageUrl: recipe?.imageUrl,
    });

    recipe.ingredients.forEach((ing: string) => {
      this.ingredients.push(
        this.fb.group({
          name: [ing],
        })
      );
    });
  }
}
