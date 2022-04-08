import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IPatch } from '../models/ipatch-model';
import { ActivatedRoute } from '@angular/router';
import { PatchesService } from 'src/app/services/patches/patches.service';
import { NotificationsService } from 'src/app/services/notifications/notifications.service';

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
  isDirty: boolean = true;

  constructor(private route: ActivatedRoute,
     private patchService: PatchesService,
    private notifications: NotificationsService) { }

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
    this.route.snapshot.params['patchName'];
  }

  deletePlantInPatch( plantName: string, patchName: string, plantId: number, patchId: number){
    this.isDirty = false;
    this.patchService.deletePlantInPatch(plantId, patchId).subscribe(() => {
      this.onPlantInPatchDeleted(plantId);
      this.notifications.showSuccess(`${plantName} has been deleted from ${patchName}`);
    });
  }

  onPlantInPatchDeleted(plantId: number){
    if(this.patch.plantList){
      var index = this.patch.plantList.findIndex((deletedPatch) => (deletedPatch.plantId === plantId));
      if (index != -1) {
        this.patch.plantList.splice(index, 1);
      }
    }
  }

}
