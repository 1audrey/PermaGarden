
import {  TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';


describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call the login method ', () => {
    const username = 'username test';
    const password = 'password test';

    let loginSpy = spyOn(service, 'loginUser').and.callThrough();

    service.loginUser(username, password);

    expect(loginSpy).toHaveBeenCalledTimes(1);
    expect(loginSpy).toHaveBeenCalledOnceWith(username, password);
  });

  it('should call the method to authenticated user ', () => {
    let loginSpy = spyOn(service, 'isAuthenticated').and.callThrough();

    service.isAuthenticated();

    expect(loginSpy).toHaveBeenCalledTimes(1);
  });

  it('should call the method to update the current user ', () => {
    const firstName = 'firstName test';
    const lastName = 'lastName test';

    let loginSpy = spyOn(service, 'updateCurrentUser').and.returnValue();

    service.updateCurrentUser(firstName, lastName);

    expect(loginSpy).toHaveBeenCalledTimes(1);
    expect(loginSpy).toHaveBeenCalledOnceWith(firstName, lastName);

  });

});
