import { NgModule, Input } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { PermagardenAppComponent } from './permagarden-app.component';
import { GardenListComponent } from './garden-list/garden-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule} from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NavigationComponent } from './navigation/navigation.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PlantThumbnailComponent } from './garden-list/plant-thumbnail/plant-thumbnail.component';
import { PlantsService } from './garden-list/shared/plants.service';
import { AddToGardenComponent } from './garden-list/add-to-garden/add-to-garden.component';
import { GardenListResolver } from './garden-list/garden-list-resolver.service';
import { AuthService } from './user/auth.service';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';




@NgModule({
  declarations: [
    PermagardenAppComponent,
    GardenListComponent,
    NavigationComponent,
    PlantThumbnailComponent,
    AddToGardenComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatDividerModule,
    MatGridListModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,

  ],
  providers:[
    PlantsService,
    {provide: 'canDeactivateAddToGarden', useValue: checkDirtyState},
    GardenListResolver,
    AuthService,
  ],
  bootstrap: [PermagardenAppComponent]
})
export class AppModule { }

export function checkDirtyState(component: AddToGardenComponent){
  if (component.isDirty)
  {
    return window.confirm('You have not saved this plant, do you really want to cancel?')
  }
  return true;

}
