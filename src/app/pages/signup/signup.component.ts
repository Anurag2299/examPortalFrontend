import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

export interface user {
  userName?: string,
  firstName?: string,
  lastName?: string,
  password?: string,
  email?: string,
  phone?: string
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {

  public userData: user ={}

  constructor(private userService: UserService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  formSubmit() {
    // alert('qwertyuio')
    if(this.userData.userName == ''|| this.userData.userName == null){
      this.snackBar.open("please enter the usernam",'ok')
      return;
    }
    this.userService.addUser(this.userData).subscribe(data => {
      Swal.fire('Success','user is registered', 'success');
    },(error) => {
      console.log(error)
    })
  }

}
