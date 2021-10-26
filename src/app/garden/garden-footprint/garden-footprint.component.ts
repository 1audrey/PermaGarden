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

}