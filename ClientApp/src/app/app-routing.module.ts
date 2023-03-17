import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewPlantComponent } from './garden-list/add-new-plant/add-new-plant.component';
import { AddToGardenComponent } from './garden-list/add-to-garden/add-to-garden.component';
import { PlantsListResolver } from './resolver/plants-list-resolver.service';
import { PlantsListComponent } from './garden-list/plants-list.component';
import { GardenFootprintComponent } from './garden/garden-footprint/garden-footprint.component';
import { ManagePatchTasksComponent } from './task/manage-patch-tasks/manage-patch-tasks.component';
import { AllTasksComponent } from './task/all-tasks/all-tasks.component';
import { CreateTaskComponent } from './task/create-task/create-task.component';
import { HomepageComponent } from './homepage/homepage/homepage.component';
import { SummaryComponent } from './homepage/summary/summary.component';
import { TaskDetailsComponent } from './task/task-details/task-details.component';
import { HistoryComponent } from './history/history.component';
import { ArchivedTasksResolver } from './resolver/archived-tasks-resolver.service';
import { AllTaskResolverService } from './resolver/all-task-resolver.service';
import { GardenCanvasComponent } from './homepage/garden-canvas/garden-canvas/garden-canvas.component';
import { PatchShapeResolverService } from './resolver/patch-shape-resolver.service';
import { SinglePatchShapeResolverService } from './resolver/single-patch-shape-resolver.service';

const routes: Routes = [
  {
    path: 'add-to-garden',
    component: AddToGardenComponent,
    canDeactivate: ['canDeactivateAddToGarden'],
  },

  {
    path: 'plants-list',
    component: PlantsListComponent,
    resolve: { plants: PlantsListResolver }
  },

  {
    path: 'home',
    component: HomepageComponent,
    resolve: { plants: PlantsListResolver, patches: PatchShapeResolverService, tasks: AllTaskResolverService }
  },

  {
    path: 'summary',
    component: SummaryComponent,
  },

  {
    path: '',
    redirectTo: '/home', pathMatch: 'full'
  },

  {
    path: 'add-new-plant',
    component: AddNewPlantComponent,
    resolve: { plants: PlantsListResolver }
  },

  {
    path: 'user',
    loadChildren: () => import('./user/user.module')
      .then(m => m.UserModule)
  },

  {
    path: 'patches',
    component: GardenFootprintComponent,
    resolve: { patches: PatchShapeResolverService }
  },

  {
    path: 'tasks',
    component: AllTasksComponent,
    resolve: { patches: PatchShapeResolverService, tasks: AllTaskResolverService }
  },

  {
    path: 'tasks/:patchName',
    component: ManagePatchTasksComponent,
    resolve: { patchName: SinglePatchShapeResolverService, patches: PatchShapeResolverService}
  },

  {
    path: 'tasks/:patchName',
    component: TaskDetailsComponent,
    resolve: { patchName: SinglePatchShapeResolverService, plants: PlantsListResolver }
  },

  {
    path: 'create-task/:patchName',
    component: CreateTaskComponent,
    resolve: { patchName: SinglePatchShapeResolverService, plants: PlantsListResolver }
  },

  {
    path: 'history',
    component: HistoryComponent,
    resolve: { plants: PlantsListResolver, archivedTasks: ArchivedTasksResolver, patches: PatchShapeResolverService }
  },

  {
    path: 'app-plant-focus-stats',
    component: HistoryComponent,
    resolve: { patches: PatchShapeResolverService , plants: PlantsListResolver}
  },

  {
    path: 'garden',
    component: GardenCanvasComponent,
    resolve: { patches: PatchShapeResolverService }
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
