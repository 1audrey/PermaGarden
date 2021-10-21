import { Component } from '@angular/core';
import { AuthService } from '../user/auth.service';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent  {

public static readonly PLANTS_WEBSITE_URL: string = '/plants-list';
public static readonly LOGIN_WEBSITE_URL: string = '/user/login';
public static readonly USERPROFILE_WEBSITE_URL: string = '/user/profile';
public static readonly GARDEN_WEBSITE_URL: string = '/garden-footprint';


constructor(public auth: AuthService){}

openPlantsList() {
  const link = document.createElement('a');
  link.href = NavigationComponent.PLANTS_WEBSITE_URL;
  link.setAttribute('visibility', 'hidden');
  link.click();
}

openLogIn(){
  const link = document.createElement('a');
  link.href = NavigationComponent.LOGIN_WEBSITE_URL;
  link.setAttribute('visibility', 'hidden');
  link.click();
}

openUserProfile(){
  const link = document.createElement('a');
  link.href = NavigationComponent.USERPROFILE_WEBSITE_URL;
  link.setAttribute('visibility', 'hidden');
  link.click();
}

openGarden() {
  const link = document.createElement('a');
  link.href = NavigationComponent.GARDEN_WEBSITE_URL;
  link.setAttribute('visibility', 'hidden');
  link.click();
}

}


