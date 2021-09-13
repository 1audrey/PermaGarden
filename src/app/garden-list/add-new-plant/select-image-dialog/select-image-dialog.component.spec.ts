import { SelectionModel } from '@angular/cdk/collections';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatListOption, MatSelectionList } from '@angular/material/list';
import { FilterPipe } from '../../pipe/filter.pipe';
import { PlantImageResolverService } from '../../resolver/plant-image-resolver.service';
import { PlantImageService } from '../../shared/plant-image.service';
import { SelectImageDialogComponent } from './select-image-dialog.component';

describe('SelectImageDialogComponent', () => {
  let component: SelectImageDialogComponent;
  let fixture: ComponentFixture<SelectImageDialogComponent>;


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
        {provide: MatDialogRef, useValue: {}}
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



});

