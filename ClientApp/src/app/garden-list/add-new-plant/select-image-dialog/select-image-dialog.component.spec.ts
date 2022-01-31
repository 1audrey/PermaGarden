import { SelectionModel } from '@angular/cdk/collections';
import { ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatListOption, MatSelectionList } from '@angular/material/list';
import { FilterPipe } from '../../../pipe/filter.pipe';
import { PlantImageResolverService } from '../../../resolver/plant-image-resolver.service';
import { PlantImageService } from '../../../shared/plant-image.service';
import { SelectImageDialogComponent } from './select-image-dialog.component';

describe('SelectImageDialogComponent', () => {
  let component: SelectImageDialogComponent;
  let fixture: ComponentFixture<SelectImageDialogComponent>;
  const dialogMock = {
    close: (image: string) => { }
    };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectImageDialogComponent, FilterPipe ],
      imports:[
        MatDialogModule,
         ],
      providers: [
        PlantImageService,
        PlantImageResolverService,
        {provide: MatListOption, useValue: {}},
        {provide: MatSelectionList, useValue: {}},
        {provide: SelectionModel, useValue: {}},
        {provide: MatDialogRef, useValue: dialogMock},

      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectImageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should cancel the form page when the button is clicked', fakeAsync(() => {
    const spy = spyOn(component, 'cancel');
    let button: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector('.cancel-button');
    button.click();
    tick();
    expect(spy).toHaveBeenCalledTimes(1);
  }));

  it('save should be called when the save button is clicked', fakeAsync(() => {
    const spy = spyOn(component, 'save');
    let button = fixture.debugElement.nativeElement.querySelector('.save-image-button');
    button.click();
    tick();
    expect(spy).toHaveBeenCalledTimes(1);
  }));

  it('should close the dialog when the save button is clicked', () => {
    const spy = spyOn(dialogMock, 'close');
    component.save();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should close the dialog when the save button is clicked with the image selected', () => {
    const selectedOption = component.imageSelected._value = ["assets/images/navy-beans.jpg"];
    const imageUrl = selectedOption.toString();

    const spy = spyOn(dialogMock, 'close');
    component.save();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith(imageUrl);
  });

  it('should close the dialog when the save button is clicked', () => {
    const spy = spyOn(dialogMock, 'close');
    component.save();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  //it('should call the plant image service when ngOnInit is initialized', inject([PlantImageService], (plantImageService: PlantImageService) => {
  //  const spy = spyOn(plantImageService, 'getPlantsImage').and.callThrough();
  //  component.ngOnInit();
  //  fixture.detectChanges();
  //  expect(spy).toHaveBeenCalledTimes(1);
  //}));
});

