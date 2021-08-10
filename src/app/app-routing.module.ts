import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewPlantComponent } from './add-new-plant/add-new-plant.component';
import { AddToGardenComponent } from './garden-list/add-to-garden/add-to-garden.component';
import { PlantsListResolver } from './garden-list/plants-list-resolver.service';
import { PlantsListComponent } from './garden-list/plants-list.component';


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
