import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './navigation.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';

import { By } from '@angular/platform-browser';
import { MatListModule } from '@angular/material/list';
import { AppRoutingModule } from '../app-routing.module';
import { PlantsListResolver } from '../resolver/plants-list-resolver.service';
import { RouterTestingModule } from '@angular/router/testing';
import { PlantsService } from '../shared/plants.service';


describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigationComponent ],
      imports: [
        NoopAnimationsModule,
        MatToolbarModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        AppRoutingModule,
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      providers:[
        PlantsListResolver,
        PlantsService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show correct title', () => {
    const title = fixture.debugElement.nativeElement.querySelector('#app-title');

    expect(title.innerText).toEqual('My Perma Garden');
  });

  it('should render title in a h1 tag', () => {
    const title = fixture.debugElement.nativeElement;
    expect(title.querySelector('h1').textContent).toContain('My Perma Garden');
  });

  [
    { menuOption: "Plants list", id: "plants-list" },
    { menuOption: "Login", id: "login" },
  ].forEach(testCase => {
    it(`should open the ${testCase.menuOption} page when user clicks on ${testCase.id} button`, () => {
      const spyObject = document.createElement("a");
      spyOn(spyObject, "click").and.callFake(() => { });
      spyOn(document, "createElement").and.returnValue(spyObject);

      const button: HTMLButtonElement = fixture.debugElement.query(By.css(`#${testCase.id}`)).nativeElement;
      button.click();
      fixture.detectChanges();

      expect(document.createElement).toHaveBeenCalledTimes(1);
      expect(document.createElement).toHaveBeenCalledWith("a");
    });
  });

});
