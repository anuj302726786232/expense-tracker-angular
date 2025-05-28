export class UserExpenses{

    constructor(type: string, notes: string, amountRs: number, date: string)
    {
      this.expenseType = type;
      this.notes = notes;
      this.amountRs = amountRs;
      this.date = date;
    }

    expenseType: string = '';
    notes: string = '';
    amountRs: number = 0;
    date: string = '';
}