import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { PermagardenAppComponent } from './permagarden-app.component';
import { PlantsListComponent } from './garden-list/plants-list.component';
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
import { PlantsListResolver } from './garden-list/resolver/plants-list-resolver.service';
import { AuthService } from './user/auth.service';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AddNewPlantComponent } from './garden-list/add-new-plant/add-new-plant.component';

import {MatCheckboxModule} from '@angular/material/checkbox';

import { SelectImageDialogComponent } from './garden-list/add-new-plant/select-image-dialog/select-image-dialog.component';
import { PlantImageService } from './garden-list/shared/plant-image.service';
import { PlantImageResolverService } from './garden-list/resolver/plant-image-resolver.service';
import { FilterPipe } from './garden-list/pipe/filter.pipe';
import { HttpClientModule } from '@angular/common/http';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSelectModule} from '@angular/material/select';

import {MatSnackBarModule} from '@angular/material/snack-bar';
import { NotificationsService } from './garden-list/shared/notifications.service';

@NgModule({
  declarations: [
    PermagardenAppComponent,
    PlantsListComponent,
    NavigationComponent,
    PlantThumbnailComponent,
    AddToGardenComponent,
    AddNewPlantComponent,
    SelectImageDialogComponent,
    FilterPipe,


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
    MatCheckboxModule,
    HttpClientModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatSnackBarModule


  ],
  providers:[
    PlantsService,
    {provide: 'canDeactivateAddToGarden', useValue: checkDirtyState},
    PlantsListResolver,
    AuthService,
    PlantImageService,
    PlantImageResolverService,
    NotificationsService

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
