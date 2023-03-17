import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { IPatchShapeModel } from 'src/app/garden/models/iPatchShape-model';
import { PatchesService } from 'src/app/services/patches/patches.service';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.css'],

  animations: [
    trigger('bodyExpansion', [
      state('collapsed, void', style({ height: '0px', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed, void => collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ]
})
export class ContextMenuComponent implements OnInit{

  @Input() patchName: string;

  state = 'collapsed';
  patch: IPatchShapeModel;

  // @Output()
  // onContextMenuItemClick: EventEmitter<any> = new EventEmitter<any>();

  // onContextMenuClick(event, data): any {
  //   this.onContextMenuItemClick.emit({
  //     event,
  //     data,
  //   });
  // }

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private dialogRef: MatDialogRef<ContextMenuComponent>,
  private patchService: PatchesService,
  private route: ActivatedRoute){}

  ngOnInit(){
  this.patchService.getASinglePatchShape(this.data.patchName).subscribe((patches) => this.patch = patches[0])

    console.log(this.patch);
  }

  toggle(): void {
    this.state = this.state === 'collapsed' ? 'expanded' : 'collapsed';
  }

  openTask(){
   this.route.snapshot.params['patchName'];
   this.dialogRef.close();
  }

  deletePlantInPatch( plantName: string, patchName: string, plantId: number, patchId: number){
    this.patchService.deletePlantInPatch(plantId, patchId).subscribe(() => {
      // this.onPlantInPatchDeleted(plantId);
      // this.notifications.showSuccess(`${plantName} has been deleted from ${patchName}`);
    });
  }

  close(){
    this.dialogRef.close();
  }
}


