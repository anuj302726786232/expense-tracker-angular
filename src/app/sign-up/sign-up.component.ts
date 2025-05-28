import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { ApiExpenseService } from '../api-service/api-expense.service';
import { response } from 'express';
import { error } from 'console';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  signUpForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private apiService: ApiExpenseService, private route: Router)
  {
    this.signUpForm = formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: [''],
      userName: ['', [Validators.required, Validators.email, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    })
  }

  signUp()
  {
    console.log(this.signUpForm.value);
    console.log('completed');

    this.apiService.addUser(this.signUpForm.value).subscribe({
      next: (response) => {
        console.log('from sign-up success', response);
        this.route.navigate(['/login'], {
          state: { email: 'sam@gmai.com' }
        });
      },

      error: (error) => {
        console.log('from sign-up error', error);
      }
    })
  }

}
