import { Injectable } from '@angular/core';
import { IUser } from 'src/app/user/user.model';

export class MockAuthService {
  currentUser!: IUser;

  loginUser(userName: string, password: string){
    this.currentUser = {
      id : 1,
      userName : 'Audrey123',
      firstName: 'Audrey',
      lastName: 'Lescot'
    }
  }

  isAuthenticated(): any{
    return !!this.currentUser;
  }
}
