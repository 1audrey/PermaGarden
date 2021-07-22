import { Component } from '@angular/core';
import { AuthService } from '../user/auth.service';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent  {

constructor(public auth: AuthService){}




}
