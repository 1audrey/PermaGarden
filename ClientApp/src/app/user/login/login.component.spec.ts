import { ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Router} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';


import { AuthService } from '../auth.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let routerSpy = {navigate: jasmine.createSpy('navigate')};


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        RouterTestingModule,
        FormsModule,
      ],
      providers:[
        {provide: Router, useValue: routerSpy},
        AuthService,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should cancel the form page when the button is clicked', fakeAsync(() => {
      spyOn(component, 'cancel');

      let button = fixture.debugElement.nativeElement.querySelector('#cancel-button');
      button.click();
      tick();
      expect(component.cancel).toHaveBeenCalledTimes(1);
    }));

    it('should navigate to the plant list page when the cancel button is clicked',inject ([Router], (routerSpy: Router) => {
      component.cancel();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['plants-list']);
    }));

    it('login should be called when the log button is clicked', fakeAsync(() => {
      spyOn(component, 'login');

      let button = fixture.debugElement.nativeElement.querySelector('#login-button');
      button.click();
      tick();
      expect(component.login).toHaveBeenCalledTimes(1);
    }));

    it('should navigate to the plant list page when the login button is clicked',inject ([Router], (routerSpy: Router) => {
      const formValues = {username: 'Peter', password: 'qwerty'}
      component.login(formValues);
      expect(routerSpy.navigate).toHaveBeenCalledWith(['plants-list']);
    }));

  it('should authenticate the user when when the login button is clicked', inject([AuthService], (mockAuthService: AuthService) => {
    let loginSpy = spyOn(mockAuthService, 'loginUser').and.callThrough();
    let login = fixture.debugElement.query(By.css('#form'));

    component.login({userName: 'test', password: '123'})
    login.triggerEventHandler('login', null);

    expect(loginSpy).toHaveBeenCalledTimes(1);
    expect(loginSpy).toHaveBeenCalledOnceWith('test', '123');
  }));

});

