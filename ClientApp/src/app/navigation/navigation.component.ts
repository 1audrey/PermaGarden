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
public static readonly GARDEN_WEBSITE_URL: string = '/garden';
public static readonly TASKS_WEBSITE_URL: string ='/tasks';

constructor(public auth: AuthService){}


}


