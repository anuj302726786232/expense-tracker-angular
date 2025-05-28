import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Route, Router } from '@angular/router';
import Chart from 'chart.js/auto';
import { ExpenseServiceService } from '../service/expense-service.service';
import { UserExpenses } from '../model/userExpenses';
import { CommonModule, NgFor } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ApiExpenseService } from '../api-service/api-expense.service';
import { response } from 'express';
import { error } from 'console';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [ ReactiveFormsModule, CommonModule ],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {

  chart: any;
  expenseList: any;
  totalAmount: number = 0;
  expenseCreateForm: any;
  userMail: any;

  @ViewChild('MyChart') myChartRef!: ElementRef;
  @ViewChild('closemodalBtn') closeModalBtn!: ElementRef;

  constructor(private router: Router, public expenseService: ExpenseServiceService, private expenseForm: FormBuilder, private apiService: ApiExpenseService)
  {
      this.expenseCreateForm = this.expenseForm.group({
        expenseType: [''],
        amount: [''],
        date: [''],
        notes: ['']
      })

      const navigation = this.router.getCurrentNavigation();
      this.userMail = navigation?.extras?.state?.['email'];
      console.log('Received user data:', this.userMail);
  }

  createExpenseRecord()
  {
    console.log("form submitted: ", this.expenseCreateForm.value);
    this.closeModalBtn.nativeElement.click();

    this.apiService.cretaeUserExpense(this.expenseCreateForm.value, this.userMail).subscribe({
      next: (response) => {
        console.log("create user expense", response);
        this.getExpenseList();
      },

      error: (error) => {
        console.log('error', error);
      }

    })

  }

  getTotalAmount(list: any)
  {
    if(Array.isArray(list))
    {
      list.forEach(listVal => {
        this.totalAmount += listVal.amountRs;
      });

      console.log(this.totalAmount);
    }
  }

  getExpenseList()
  {
    // this.expenseList = this.expenseService.getUserExpenseList();
    this.apiService.getExpenseListByEmailId(this.userMail).subscribe({
      next: (response) => {
        this.expenseList = response;
        console.log('from API: ', this.expenseList);
        console.log('rspnse: ', response);
        this.getTotalAmount(this.expenseList);
      },

      error: (error) => {
        console.log('error', error);
      }
    });
    console.log("From userDashboard: ", this.expenseList);
  }

  createChart() {
    const ctx = this.myChartRef.nativeElement.getContext('2d');

    this.chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Red', 'Pink', 'Green', 'Yellow', 'Orange', 'Blue'],
        datasets: [{
          label: 'My First Dataset',
          data: [300, 240, 100, 432, 253, 34],
          backgroundColor: ['red', 'pink', 'green', 'yellow', 'orange', 'blue'],
          hoverOffset: 4
        }],
      },
      options: {
        aspectRatio: 2.5
      }
    });
  }

  ngOnInit(): void {
    // this.createChart();

    // const navigation = this.router?.getCurrentNavigation();
    // const data = navigation?.extras.state as { data: any};

    // console.log(data);
    this.getExpenseList();
  }


}
