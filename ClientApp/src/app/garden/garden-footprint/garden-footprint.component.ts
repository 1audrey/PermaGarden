import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'src/app/services/notifications/notifications.service';
import { PatchesService } from 'src/app/services/patches/patches.service';
import { IPatch } from '../models/ipatch-model';

@Component({
  selector: 'app-garden-footprint',
  templateUrl: './garden-footprint.component.html',
  styleUrls: ['./garden-footprint.component.css']
})
export class GardenFootprintComponent implements OnInit {
patches!: IPatch[];
patch!: IPatch[];
search!: '';
public static readonly CREATEPATCH_WEBSITE_URL: string = '/create-patch';

  constructor(private route: ActivatedRoute,
    private patchService: PatchesService,
    private notifications: NotificationsService) {

  }

  ngOnInit() {
    this.patches = this.route.snapshot.data['patches'];
    console.log(this.patches);
  }

  onPatchDeleted(patch: IPatch){
    var index = this.patches.findIndex((deletedPatch) => (deletedPatch === patch));
    if (index != -1) {
      this.patches.splice(index, 1);
    }
  }

  createPatch(){
    const link = document.createElement('a');
    link.href = GardenFootprintComponent.CREATEPATCH_WEBSITE_URL;
    link.setAttribute('visibility', 'hidden');
    link.click();
  }

  patchToDelete(patch: IPatch) {
    this.patchService.patchToDelete(patch.patchName).subscribe(() => {
      this.notifications.showSuccess(`${patch.patchName} has been deleted`);
      this.onPatchDeleted(patch);
    });
  }

}


