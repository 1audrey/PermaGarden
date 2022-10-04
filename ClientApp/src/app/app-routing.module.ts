import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewPlantComponent } from './garden-list/add-new-plant/add-new-plant.component';
import { AddToGardenComponent } from './garden-list/add-to-garden/add-to-garden.component';
import { PlantsListResolver } from './resolver/plants-list-resolver.service';
import { PlantsListComponent } from './garden-list/plants-list.component';
import { GardenFootprintComponent } from './garden/garden-footprint/garden-footprint.component';
import { PatchResolverService } from './resolver/patch-resolver.service';
import { CreatePatchComponent } from './garden/create-patch/create-patch.component';
import { ManagePatchTasksComponent } from './task/manage-patch-tasks/manage-patch-tasks.component';
import { PatchListDetailsComponent } from './garden/patch-list-details/patch-list-details.component';
import { AllTasksComponent } from './task/all-tasks/all-tasks.component';
import { CreateTaskComponent } from './task/create-task/create-task.component';
import { HomepageComponent } from './homepage/homepage/homepage.component';
import { SummaryComponent } from './homepage/summary/summary.component';
import { SinglepatchResolverService } from './resolver/singlepatch-resolver.service';
import { TaskDetailsComponent } from './task/task-details/task-details.component';
import { HistoryComponent } from './history/history.component';
import { ArchivedTasksResolver } from './resolver/archived-tasks-resolver.service';
import { AllTaskResolverService } from './resolver/all-task-resolver.service';
import { GardenGridComponent } from './homepage/garden-grid/garden-grid.component';

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
    resolve: { plants: PlantsListResolver, patches: PatchResolverService, tasks: AllTaskResolverService }
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
    path: 'garden',
    component: GardenFootprintComponent,
    resolve: { patches: PatchResolverService }
  },

  {
    path: 'garden/:patchName',
    component: PatchListDetailsComponent,
    resolve: { patchName: SinglepatchResolverService, plants: PlantsListResolver }
  },

  {
    path: 'create-patch',
    component: CreatePatchComponent,
    resolve: { patches: PatchResolverService }
  },

  {
    path: 'tasks',
    component: AllTasksComponent,
    resolve: { patches: PatchResolverService, tasks: AllTaskResolverService }
  },

  {
    path: 'tasks/:patchName',
    component: ManagePatchTasksComponent,
    resolve: { patchName: SinglepatchResolverService, patches: PatchResolverService}
  },

  {
    path: 'tasks/:patchName',
    component: TaskDetailsComponent,
    resolve: { patchName: SinglepatchResolverService, plants: PlantsListResolver }
  },

  {
    path: 'create-task/:patchName',
    component: CreateTaskComponent,
    resolve: { patchName: SinglepatchResolverService, plants: PlantsListResolver }
  },
  {
    path: 'history',
    component: HistoryComponent,
    resolve: { plants: PlantsListResolver, archivedTasks: ArchivedTasksResolver, patches: PatchResolverService }
  },
  {
    path: 'app-plant-focus-stats',
    component: HistoryComponent,
    resolve: { patches: PatchResolverService , plants: PlantsListResolver}
  },

  {
    path: 'garden-grid',
    component: GardenGridComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
