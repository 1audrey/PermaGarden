import { Component, Input } from '@angular/core';
import { IPatch } from '../garden-footprint/models/ipatch-model';

@Component({
  selector: 'app-patch-list',
  templateUrl: './patch-list.component.html',
  styleUrls: ['./patch-list.component.css']
})
export class PatchListComponent {
  @Input() patch!: IPatch;

  constructor() { }



}
