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
    path: '',
    redirectTo: '/', pathMatch: 'full'
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
    path: 'garden-footprint',
    component: GardenFootprintComponent,
    resolve: { patches: PatchResolverService }
  },

  {
    path: 'create-patch',
    component: CreatePatchComponent,
    resolve: { patches: PatchResolverService }

  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
