import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { PatchesService } from '../../services/patches/patches.service';


import { GardenFootprintComponent } from './garden-footprint.component';

describe('GardenFootprintComponent', () => {
  let component: GardenFootprintComponent;
  let fixture: ComponentFixture<GardenFootprintComponent>;
  let route: ActivatedRoute;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [ GardenFootprintComponent ],
      providers:
        [
          {
            provide: ActivatedRoute, useValue: { snapshot: { data: PatchesService.PATCHES } }
          }
        ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GardenFootprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    route = TestBed.inject(ActivatedRoute);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return patches when ngOnInit is called', async() => {
    const data = route.snapshot.data['patches'];

    const initial = component.ngOnInit();
    fixture.detectChanges();

    expect(initial).toEqual(data);
  });


});
