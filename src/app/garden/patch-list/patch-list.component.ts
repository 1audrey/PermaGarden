import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { IPatch } from '../garden-footprint/models/ipatch-model';



@Component({
  selector: 'app-patch-list',
  templateUrl: './patch-list.component.html',
  styleUrls: ['./patch-list.component.css'],

  animations: [
    trigger('bodyExpansion', [
      state('collapsed, void', style({ height: '0px', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed, void => collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ]
})
export class PatchListComponent {
  @Input() patch!: IPatch;

  state = 'collapsed';

  constructor() { }

  toggle(): void {
    this.state = this.state === 'collapsed' ? 'expanded' : 'collapsed';

  }

}
