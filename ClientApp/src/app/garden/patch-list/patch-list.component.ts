import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IPatch } from '../models/ipatch-model';
import { ActivatedRoute, Router } from '@angular/router';

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
  @Output() patchDeleted: EventEmitter<any> = new EventEmitter();

  state = 'collapsed';

  constructor(private route: ActivatedRoute, private router: Router) { }

  toggle(): void {
    this.state = this.state === 'collapsed' ? 'expanded' : 'collapsed';
  }

  delete(){
    this.patchDeleted.emit();
  }

  editPatch(){
    this.route.snapshot.params['patchName'];
  }

  openTask(){
   this.route.snapshot.params['patchName' ];

  }

}
