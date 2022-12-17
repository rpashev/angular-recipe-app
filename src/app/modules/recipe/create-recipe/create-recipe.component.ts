import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray,
} from '@angular/forms';
import { Router } from '@angular/router';
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
    private userApi: UserApiService,
    private fb: FormBuilder
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
      directions: [null, Validators.required, Validators.maxLength(5000)],
    });
  }

  get ingredients(): FormArray {
    return this.recipeForm.controls['ingredients'] as FormArray;
  }

  onSubmit() {
    console.log(this.recipeForm.value.ingredients);
    if (this.recipeForm.valid) {
      this.loading = true;
      this.error = null;
    }
  }
  addIngredientInput() {
    let ingredientFormGroup = this.fb.group({
      name: [null],
    }) as FormGroup;

    this.ingredients.push(ingredientFormGroup);
  }
}
