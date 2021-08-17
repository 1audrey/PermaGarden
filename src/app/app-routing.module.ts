import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewPlantComponent } from './garden-list/add-new-plant/add-new-plant.component';
import { AddToGardenComponent } from './garden-list/add-to-garden/add-to-garden.component';
import { PlantsListResolver } from './garden-list/resolver/plants-list-resolver.service';
import { PlantsListComponent } from './garden-list/plants-list.component';
import { SelectImageDialogComponent } from './garden-list/add-new-plant/select-image-dialog/select-image-dialog.component';
import { PlantImageResolverService } from './garden-list/resolver/plant-image-resolver.service';


const routes: Routes = [
  {path: 'add-to-garden',
  component: AddToGardenComponent,
  canDeactivate:['canDeactivateAddToGarden']
  },

  {path: 'plants-list',
  component: PlantsListComponent,
  resolve: {plants: PlantsListResolver}
  },

  {path: '',
  redirectTo:'/plants-list', pathMatch: 'full'
  },

  {path: 'add-new-plant',
  component: AddNewPlantComponent,
  canDeactivate:['canDeactivateAddToGarden']
  },

  {path: 'user',
  loadChildren: () => import('./user/user.module')
  .then(m => m.UserModule)
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
