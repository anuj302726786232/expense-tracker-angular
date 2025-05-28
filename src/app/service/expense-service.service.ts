import { Injectable } from '@angular/core';
import { UserExpenses } from '../model/userExpenses';

@Injectable({
  providedIn: 'root'
})
export class ExpenseServiceService {

  userExpenseList: UserExpenses[] = [
    new UserExpenses('Rent', 'Room Rent', 20000, '22/04/2022'),
    new UserExpenses('Groceries', 'Monthly groceries', 5000, '25/04/2022'),
    new UserExpenses('Electricity', 'Electricity bill', 1500, '28/04/2022'),
    new UserExpenses('Internet', 'Wi-Fi bill', 1000, '29/04/2022'),
    new UserExpenses('Transport', 'Bus and cab fare', 2000, '30/04/2022'),
    new UserExpenses('Dining', 'Weekend dining out', 2500, '01/05/2022'),
    new UserExpenses('Gym', 'Monthly gym membership', 1200, '02/05/2022'),
    new UserExpenses('Streaming', 'Netflix subscription', 500, '03/05/2022'),
    new UserExpenses('Mobile', 'Mobile recharge', 300, '04/05/2022'),
    new UserExpenses('Medical', 'Pharmacy expenses', 800, '05/05/2022'),
    new UserExpenses('Clothing', 'New clothes shopping', 3000, '06/05/2022')

  ]

  constructor() 
  {

  }

  getUserExpenseList(): UserExpenses[]
  {
    return this.userExpenseList;
  }
}
