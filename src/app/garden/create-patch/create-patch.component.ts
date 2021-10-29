import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPatchShape } from '../garden-footprint/models/ipatch-shape';

@Component({
  selector: 'app-create-patch',
  templateUrl: './create-patch.component.html',
  styleUrls: ['./create-patch.component.css']
})
export class CreatePatchComponent  {

  newPatch!: any;
  icon!: IPatchShape[];

  selectedIcon!: string;

  constructor(private router: Router,
  ) { }

  icons: IPatchShape[] =
    [{
      name: 'square',
      url: 'assets/shapes/square-shape.png'
    },
    {
      name: 'hexagone',
      url: 'assets/shapes/hexagon-shape.png'
    }
    ]

  cancel() {
    this.router.navigate(['garden-footprint']);
  }



}
