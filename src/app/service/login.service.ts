import { Injectable } from '@angular/core';
import { UserLogIn } from '../model/userLogIn';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  userLogInList: UserLogIn[] = [
    new UserLogIn("anuj@gmail.com", "12345678"),
    new UserLogIn("xyz@gmail.com", "12345678"),
    new UserLogIn("peter@gmail.com", "12345678"),
    new UserLogIn("sam@gmail.com", "12345678"),
    new UserLogIn("john@gmail.com", "12345678")
  ];

  constructor() { }

  validateUser(emailId: string, pswd: string): boolean
  {
      var userExist = this.userLogInList.find(user => user.emailId == emailId && user.password == pswd);
      console.log(userExist); 

      if(userExist)
      {
        return true;
      }
      return false;
  }
}
