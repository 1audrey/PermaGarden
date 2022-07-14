import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterTestingModule } from '@angular/router/testing';
import { PlantThumbnailComponent } from './plant-thumbnail.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { PlantsListResolver } from '../../resolver/plants-list-resolver.service';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { PlantsListComponent } from '../plants-list.component';
import { By } from '@angular/platform-browser';
import { PlantsService } from '../../services/plants/plants.service';
import { MockPipe } from 'src/app/mock/mock-pipe';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { AddToGardenComponent } from '../add-to-garden/add-to-garden.component';
import { PatchesService } from 'src/app/services/patches/patches.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

fdescribe('PlantThumbnailComponent', () => {
  let component: PlantsListComponent;
  let fixture: ComponentFixture<PlantsListComponent>;
  let componentThumbnail: PlantThumbnailComponent;
  let fixtureThumbnail: ComponentFixture<PlantThumbnailComponent>;


  beforeEach(async () => {
    const fakeRoute = {
      snapshot: {
        data: {
          plants: [
            {
              plantId: 1,
              plantName: 'Name test',
              plantStartingMonths: 'January, February',
              plantStartingMethod: 'Starting Method Test',
              plantSowingPeriod: 1,
              plantHarvestingMonths: 'January, February',
              plantGrowingPeriod: 1,
              plantImagePicture: 'Plant Image Test',
            }]
        },
      } as Partial<ActivatedRouteSnapshot>,
    } as ActivatedRoute;

    await TestBed.configureTestingModule({
      declarations: [
        PlantThumbnailComponent,
        PlantsListComponent,
        MockPipe,
      ],
      imports: [
        NoopAnimationsModule,
        MatToolbarModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatCardModule,
        MatDialogModule,
        AppRoutingModule,
        RouterTestingModule,

      ],
      providers: [
        PlantsListResolver,
        PatchesService,
        HttpClient,
        HttpHandler,
        { provide: PlantsService, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: ActivatedRoute, useValue: fakeRoute },

      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    fixtureThumbnail = TestBed.createComponent(PlantThumbnailComponent);
    componentThumbnail = fixtureThumbnail.componentInstance;
    fixture.detectChanges();

    componentThumbnail.plant = component.plants[0];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the toggle method when the moreInfo button is clicked', () => {
    let spy = spyOn(componentThumbnail, 'toggle');

    fixtureThumbnail.debugElement.query(By.css('.more-info')).nativeElement.click();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should return the state of the toggle', () => {
    componentThumbnail.toggle();

    expect(componentThumbnail.state).toEqual('expanded');

    componentThumbnail.toggle();

    expect(componentThumbnail.state).toEqual('collapsed');
  });

  it('should call the typeOfStarting method when the toggle method is called', () => {
    let spy = spyOn(componentThumbnail, 'typeOfStarting');

    componentThumbnail.toggle();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  [
    { plantStartingMethod: 'Sowing in pots', expectedStartingMethod: 'Sow' },
    { plantStartingMethod: 'Planting', expectedStartingMethod: 'Plant' }
  ].forEach((testCase) => {
    it(`should should return the ${testCase.expectedStartingMethod} when the typeOfStarting method is called`, () => {
      componentThumbnail.plant = {
        plantId: 1,
        plantName: 'Name test',
        plantStartingMonths: 'Starting Months',
        plantStartingMethod: `${testCase.plantStartingMethod}`,
        plantSowingPeriod: 1,
        plantHarvestingMonths: 'Harvesting Month Test',
        plantGrowingPeriod: 1,
        plantImagePicture: 'Plant Image Test',
      }
      componentThumbnail.typeOfStarting();

      expect(componentThumbnail.startingMethod).toEqual(testCase.expectedStartingMethod)
    });
  });

  [
    { month: 'January', expectedIcon: 'check_circle', index: 1, sowingMethod: true },
    { month: 'March', expectedIcon: 'highlight_off', index: 3, sowingMethod: false },
  ].forEach((testCase) => {
    it(`should return the ${testCase.expectedIcon} if the isSowingMonthIncluded method is ${testCase.sowingMethod}`, () => {
      let expectedIcon = testCase.expectedIcon;
      let icon = fixture.debugElement.queryAll(By.css('.mat-icon'));

      componentThumbnail.isSowingMonthIncluded(testCase.month);

      expect(icon[testCase.index].nativeElement.innerText).toEqual(expectedIcon);

    });
  });

  it('should call the delete method when the delete button is clicked', (() => {
    let spy = spyOn(componentThumbnail, 'delete');

    fixtureThumbnail.debugElement.query(By.css('.delete')).nativeElement.click();

    expect(spy).toHaveBeenCalledTimes(1);
  }));

  it('should emit the event when the delete method is called', () => {
    let spy = spyOn(componentThumbnail.plantDeleted, 'emit');

    componentThumbnail.delete();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  [
    { month: 'January', expectedIcon: 'check_circle', index: 1, harvestingMethod: true },
    { month: 'March', expectedIcon: 'highlight_off', index: 3, harvestingMethod: false },
  ].forEach((testCase) => {
    it(`should return the ${testCase.expectedIcon} if the isHarvestingMonthIncluded method is ${testCase.harvestingMethod}`, () => {
      let expectedIcon = testCase.expectedIcon;
      let icon = fixture.debugElement.queryAll(By.css('.mat-icon'));

      componentThumbnail.isHarvestingMonthIncluded(testCase.month);

      expect(icon[testCase.index].nativeElement.innerText).toEqual(expectedIcon);

    });
  });

  it('should call the addToGarden method when the add to garden button is clicked', (() => {
    let spy = spyOn(componentThumbnail, 'addToGarden');

    fixtureThumbnail.debugElement.query(By.css('.add-to-garden')).nativeElement.click();

    expect(spy).toHaveBeenCalledTimes(1);
  }));

  it('should open the select image dialog when when the addToGarden method is called', inject([MatDialog], (dialog: MatDialog) => {
    let spy = spyOn(componentThumbnail.dialog, 'open');

    componentThumbnail.addToGarden();

    expect(spy).toHaveBeenCalledTimes(1);
  }));

  it('open dialog test', () => {
    const openDialogSpy = spyOn(componentThumbnail.dialog, 'open').and.callThrough();

    componentThumbnail.addToGarden();

    expect(openDialogSpy).toHaveBeenCalledWith(AddToGardenComponent, {
      width: '250px',
      data: {
        plantId: componentThumbnail.plant.plantId
      }
    });
   });
});
