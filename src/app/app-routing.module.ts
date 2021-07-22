import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddToGardenComponent } from './garden-list/add-to-garden/add-to-garden.component';
import { GardenListResolver } from './garden-list/garden-list-resolver.service';
import { GardenListComponent } from './garden-list/garden-list.component';
import { UserModule } from './user/user.module';

const routes: Routes = [
  {path: 'add-to-garden',
  component: AddToGardenComponent,
  canDeactivate:['canDeactivateAddToGarden']
  },

  {path: 'plants-list',
  component: GardenListComponent,
  resolve: {plants: GardenListResolver}
  },

  {path: '',
  redirectTo:'/plants-list', pathMatch: 'full'
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
