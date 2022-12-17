import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserApiService } from 'src/app/services/user.service';
import { ParentErrorStateMatcher } from '../ErrorStateManager';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  loading = false;
  error: string | null = null;
  registerForm!: FormGroup;
  parentErrorStateMatcher = new ParentErrorStateMatcher();

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userApi: UserApiService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      passwords: this.fb.group(
        {
          password: [null, [Validators.required, Validators.minLength(6)]],
          repeatPassword: [null],
        },
        { validators: this.passwordsValidator }
      ),
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.loading = true;
      this.error = null;
      const { firstName, lastName, email } = this.registerForm.value;
      const { password, repeatPassword } = this.registerForm.value.passwords;
      const data = { firstName, lastName, email, password, repeatPassword };
      this.userApi.register(data).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/']);
        },
        error: (error) => {
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

  passwordsValidator: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    let pass = group.get('password')?.value;
    let repeatPass = group.get('repeatPassword')?.value;
    console.log(pass === repeatPass);
    return pass === repeatPass ? null : { notEqual: true };
  };
}
