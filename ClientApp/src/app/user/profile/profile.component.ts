import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup ;
  private firstName! : FormControl;
  private lastName! : FormControl;

  constructor(private authservice:AuthService, private router:Router){

  }

  ngOnInit(): void {
    this.firstName = new FormControl
    (this.authservice.currentUser.firstName, [Validators.required, Validators.pattern('[a-zA-Z].*')])

    this.lastName = new FormControl
    (this.authservice.currentUser.lastName, [Validators.required, Validators.pattern('[a-zA-Z].*')])

    this.profileForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName
    })
  }

  cancel(){
    this.router.navigate(['plants-list']);
  }

  saveProfile(formValues: any){
    if(this.profileForm.valid){
      this.authservice.updateCurrentUser(formValues.firstName, formValues.lastName);
      this.router.navigate(['plants-list']);
    }
  }

  validateLastName(){
  return this.lastName.valid || this.lastName.untouched;
  }

  validateFirstName(){
    return this.firstName.valid || this.firstName.untouched;

  }
}
