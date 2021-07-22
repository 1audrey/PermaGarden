import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  userName: any;
  password: any;

  constructor(private authService: AuthService,
    private router: Router){}

  login(formValues: any){
    this.authService.loginUser(formValues.userName, formValues.password);
    this.router.navigate(['plants-list']);
  }

  cancel(){
    this.router.navigate(['plants-list']);
  }

}
