import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthService } from '../auth.service';

import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileComponent ],
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,

      ],
      providers:[
        {provide: AuthService, useValue:{}},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();

  });

  it('should create', (() => {
    expect(component).toBeTruthy();
  }));

});


