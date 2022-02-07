import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PlantsListResolver } from './resolver/plants-list-resolver.service';
import {  PermagardenAppComponent } from './permagarden-app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        PermagardenAppComponent
      ],
      providers: [
        PlantsListResolver
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent( PermagardenAppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as patchImageTitle 'My Perma Garden'`, () => {
    const fixture = TestBed.createComponent( PermagardenAppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('My Perma Garden');
  });
});
