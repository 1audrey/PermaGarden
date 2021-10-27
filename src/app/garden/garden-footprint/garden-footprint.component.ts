import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPatch } from './models/ipatch-model';

@Component({
  selector: 'app-garden-footprint',
  templateUrl: './garden-footprint.component.html',
  styleUrls: ['./garden-footprint.component.css']
})
export class GardenFootprintComponent implements OnInit {
patches!: IPatch[];
patch!: IPatch[];
search!: '';

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.patches = this.route.snapshot.data['patches'];
  }

  onPatchDeleted(patch: IPatch){
    var index = this.patches.findIndex((deletedPatch) => (deletedPatch === patch));
    console.log(`${patch.name} has been deleted`);
    if (index != -1) {
      this.patches.splice(index, 1);
    }
  }

}


