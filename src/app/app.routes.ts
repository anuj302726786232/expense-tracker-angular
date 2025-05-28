import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import path from 'node:path';
import { LoginComponent } from './component/login/login.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';

export const routes: Routes = [
     { path: '', redirectTo: 'login', pathMatch: 'full' },
     { path: 'login', component: LoginComponent },
     { path: 'signUp', component: SignUpComponent},
     { path: 'user-dashboard', component: UserDashboardComponent},
     { path: '**', component: PageNotFoundComponent}
];
