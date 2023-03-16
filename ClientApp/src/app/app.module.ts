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

import { AddToGardenComponent } from './garden-list/add-to-garden/add-to-garden.component';
import { PlantsListResolver } from './resolver/plants-list-resolver.service';
import { AuthService } from './user/auth.service';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AddNewPlantComponent } from './garden-list/add-new-plant/add-new-plant.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { SelectImageDialogComponent } from './garden-list/add-new-plant/select-image-dialog/select-image-dialog.component';
import { PlantImageResolverService } from './resolver/plant-image-resolver.service';
import { FilterPipe } from './pipe/filter.pipe';
import { HttpClientModule } from '@angular/common/http';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { GardenFootprintComponent } from './garden/garden-footprint/garden-footprint.component';
import { PatchListComponent } from './garden/patch-list/patch-list.component';
import { PatchResolverService } from './resolver/patch-resolver.service';
import { CreatePatchComponent } from './garden/create-patch/create-patch.component';
import { ManagePatchTasksComponent } from './task/manage-patch-tasks/manage-patch-tasks.component';
import { PatchListDetailsComponent } from './garden/patch-list-details/patch-list-details.component';
import { AllTasksComponent } from './task/all-tasks/all-tasks.component';
import { TaskDetailsComponent } from './task/task-details/task-details.component';
import { CreateTaskComponent } from './task/create-task/create-task.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { CompleteTaskDialogComponent } from './task/complete-task-dialog/complete-task-dialog.component';
import { DialogCreateTaskComponent } from './task/dialog-create-task/dialog-create-task.component';
import { HomepageComponent } from './homepage/homepage/homepage.component';
import { WeatherComponent } from './homepage/weather/weather.component';
import { SummaryComponent } from './homepage/summary/summary.component';
import { PlantsService } from './services/plants/plants.service';
import { PlantImageService } from './services/plants/plant-image.service';
import { NotificationsService } from './services/notifications/notifications.service';
import { PatchesService } from './services/patches/patches.service';
import { SinglepatchResolverService } from './resolver/singlepatch-resolver.service';
import { MockPipe } from './mock/mock-pipe';
import { HistoryComponent } from './history/history.component';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatChipsModule} from '@angular/material/chips';
import { PlantFocusStatsComponent } from './history/plant-focus-stats/plant-focus-stats.component';
import { ArchivedTasksResolver } from './resolver/archived-tasks-resolver.service';
import { NoTaskComponent } from './task/no-task/no-task.component';
import { GardenCanvasComponent } from './homepage/garden-canvas/garden-canvas/garden-canvas.component';
import { RectangleDialogComponent } from './homepage/garden-canvas/garden-canvas/rectangle-dialog/rectangle-dialog.component';
import { CircleDialogComponent } from './homepage/garden-canvas/garden-canvas/circle-dialog/circle-dialog.component';
import { ImageShapeDialogComponent } from './homepage/garden-canvas/garden-canvas/image-shape-dialog/image-shape-dialog.component';
import { ContextMenuComponent } from './homepage/garden-canvas/garden-canvas/context-menu/context-menu.component';
import { FoundationShapeDialogComponent } from './homepage/garden-canvas/garden-canvas/foundation-shape-dialog/foundation-shape-dialog.component';

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
    GardenFootprintComponent,
    PatchListComponent,
    CreatePatchComponent,
    ManagePatchTasksComponent,
    PatchListDetailsComponent,
    AllTasksComponent,
    TaskDetailsComponent,
    CreateTaskComponent,
    CompleteTaskDialogComponent,
    DialogCreateTaskComponent,
    HomepageComponent,
    WeatherComponent,
    SummaryComponent,
    MockPipe,
    HistoryComponent,
    PlantFocusStatsComponent,
    NoTaskComponent,
    GardenCanvasComponent,
    RectangleDialogComponent,
    CircleDialogComponent,
    ImageShapeDialogComponent,
    ContextMenuComponent,
    FoundationShapeDialogComponent,



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
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatMenuModule,
    HttpClientModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatChipsModule
  ],

  providers:[
    PlantsService,
    {provide: 'canDeactivateAddToGarden', useValue: checkDirtyState},
    PlantsListResolver,
    AuthService,
    PlantImageService,
    PlantImageResolverService,
    NotificationsService,
    PatchResolverService,
    PatchesService,
    SinglepatchResolverService,
    ArchivedTasksResolver,
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'}


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
