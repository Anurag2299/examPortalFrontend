import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService, tokenData } from 'src/app/service/login.service';
import { UserData } from 'src/app/service/user.service';
export interface loginDetails{
  userName: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginData:loginDetails = {
    userName : '',
    password : ''
  }

  constructor(private snack:MatSnackBar, private loginService:LoginService) {
    this.loginData
   }

  ngOnInit(): void {
  }

  login(){
    if(this.loginData.userName.trim() == '' || !this.loginData.userName){
      this.snack.open('username is require','ok');
      return;
    }
    if(this.loginData.password.trim() == '' || !this.loginData.password){
      this.snack.open('password is require','ok');
      return;
    }
    // request server to generate token

    this.loginService.generateToke(this.loginData).subscribe((data: tokenData) => {
      console.log(data);

      this.loginService.loginUser(data.token)
      this.loginService.getCurrentUser().subscribe((data: UserData) => {
        this.loginService.setUser(data);

        // redirect to admin or user dashboard

        if(this.loginService.getUserRole() === 'normal'){

        } else if(this.loginService.getUserRole() === 'admin') {

        } else{
          this.loginService.logOut();
        }
      })

    }, error => {
      console.log(error);
    })
  }

}
