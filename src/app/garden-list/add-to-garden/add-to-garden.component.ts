import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-to-garden',
  templateUrl: './add-to-garden.component.html',
  styleUrls: ['./add-to-garden.component.css']
})
export class AddToGardenComponent  {
isDirty: boolean = true;

  constructor(private router: Router) { }



  cancel(){
    this.router.navigate(['/plants-list'])
  }

}
