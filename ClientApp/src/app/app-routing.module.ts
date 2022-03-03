import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewPlantComponent } from './garden-list/add-new-plant/add-new-plant.component';
import { AddToGardenComponent } from './garden-list/add-to-garden/add-to-garden.component';
import { PlantsListResolver } from './resolver/plants-list-resolver.service';
import { PlantsListComponent } from './garden-list/plants-list.component';
import { PlantImageResolverService } from './resolver/plant-image-resolver.service';
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

const routes: Routes = [
  {
    path: 'add-to-garden',
    component: AddToGardenComponent,
    canDeactivate: ['canDeactivateAddToGarden']
  },

  {
    path: 'plants-list',
    component: PlantsListComponent,
    resolve: { plants: PlantsListResolver }
  },

  {
    path: 'home',
    component: HomepageComponent,
    resolve: { plants: PlantsListResolver, patches: PatchResolverService }
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
    resolve: { plants: PlantImageResolverService }
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
  },

  {
    path: 'tasks/:patchName',
    component: ManagePatchTasksComponent,
  },

  {
    path: 'create-task/:patchName',
    component: CreateTaskComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
