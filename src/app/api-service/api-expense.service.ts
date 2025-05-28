import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiExpenseService {

  constructor(private httpClient: HttpClient) 
  {
     
  }

  addUser(userDetails: any): Observable<any>
  {
    const userData = {
      firstName: userDetails.firstName?.trim(),
      lastName: userDetails.lastName?.trim(),
      userEmail: userDetails.userName?.trim(),
      password: userDetails.password?.trim()
    };


    console.log('from api-service userDetails', userData);
    console.log('from api-service', userDetails);
    return this.httpClient.post("https://localhost:7228/api/Expense/singup", userData, {
      headers: new HttpHeaders ({ 'Content-Type': 'application/json' })
    });
  }

  logInUser(userEmail: any, password: any): Observable<any>
  {
    return this.httpClient.get(`https://localhost:7228/api/Expense/login?EmailId=${userEmail}&Password=${password}`)
  }

  getExpenseListByEmailId(emailId: any): Observable<any>
  {
    console.log('from get by email Id');
    return this.httpClient.get(`https://localhost:7228/api/Expense/getexpense?EmailId=${emailId}`);
  }

  cretaeUserExpense(expenseDetails: any, emailId: string): Observable<any>
  {
    const expenseInfo = {
         expenseType: expenseDetails.expenseType,
         notes: expenseDetails.notes,
         amountRs: expenseDetails.amount,
         date: expenseDetails.date,
         emailId: emailId
    }

    return this.httpClient.post("https://localhost:7228/api/Expense/createexpense", expenseInfo, {
      headers: new HttpHeaders ({ 'Content-Type': 'application/json' })
    });
  }
}
