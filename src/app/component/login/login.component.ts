import { state } from '@angular/animations';
import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { LoginService } from '../../service/login.service';
import { ApiExpenseService } from '../../api-service/api-expense.service';
import { response } from 'express';
import { error } from 'console';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  logInCred: any;
  IsLogIn: boolean = false;
  logInData: any;
  
  constructor(private formBuilder: FormBuilder, private router: Router, private logInservice: LoginService, private apiService: ApiExpenseService)
  {
    this.logInCred = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.email, Validators.minLength(5)]],
      password: ['', [Validators.required,  Validators.minLength(5)]]
    })
  }
  

  logIn()
  {
    this.IsLogIn = true;
    console.log(this.logInCred.value);
    this.logInData = this.logInCred.value;
    // this.IsLogIn = this.logInservice.validateUser(this.logInData.userName, this.logInData.password);
    if(this.IsLogIn)
    {
      this.apiService.logInUser(this.logInData.userName,  this.logInData.password).subscribe({
        next: (response)=> {
          console.log('login reponse success', response);
          this.router.navigate(['/user-dashboard'], {
            state: { email: this.logInData.userName }
          });
        },

        error: (error) => {
          console.log('login error', error);
        }
      });
     
    }
    else
    {
      console.log('no valid user');
      this.router.navigate(['/login']);
    }
  }

  
}
