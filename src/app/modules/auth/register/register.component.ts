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
import { Router } from '@angular/router';
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

  constructor(private router: Router, private fb: FormBuilder) {}

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
      console.log(data);
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
