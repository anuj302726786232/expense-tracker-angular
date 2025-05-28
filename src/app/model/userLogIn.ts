export class UserLogIn
{
    emailId: string = '';
    password: string = '';

    constructor(email: string, pswd: string)
    {
        this.emailId = email,
        this.password = pswd
    }
}