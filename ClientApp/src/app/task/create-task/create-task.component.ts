import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPlantsList } from 'src/app/garden-list/models/iplants-model';
import { IPatch } from 'src/app/garden/models/ipatch-model';
import { NotificationsService } from '../../services/notifications/notifications.service';
import { PatchesService } from '../../services/patches/patches.service';
import { ITask } from '../models/itask-model';


@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {
  isDirty: boolean = true;
  newTask!: any;
  selectedPlant!: IPlantsList;
  selectedTask!: string;
  selectedDate!: Date;
  plants!: IPlantsList[];
  tasks!: any;


  @Input() patch!: IPatch;

  constructor(private patchService: PatchesService,
    private notifications: NotificationsService,
    private route: ActivatedRoute,
    private router: Router,
  ) {

  }

  ngOnInit(): void {
    this.patch = this.patchService.getSinglePatch(this.route.snapshot.params['patchName']);
    // this.patchService.getPatch().forEach(patches => {
    //   patches.forEach(specificPatch=> {
    //     if(specificPatch.plantName = this.route.snapshot.params['patchName']){
    //    this.patch = specificPatch;
    //   }
    //  });
    // });
  }

  getPlantStartingMethod() {
    let patchPlantList: string;
    if (this.patch.plantlist?.length && this.selectedPlant) {
      for (let plant of this.patch.plantlist) {
        if (plant.plantName == this.selectedPlant.plantName) {
          patchPlantList = plant.plantStartingMethod;

          this.tasks =
          [
            { value: patchPlantList },
          ];
        }
      }
    }
}

  saveTask(patchName: string, formValues: ITask) {
    this.isDirty = false;
    formValues.patchName = patchName;
    this.patchService.saveTaskInPatch(patchName, formValues);
    this.notifications.showSuccess(`${formValues.action} has been added to ${this.patch.name}`);
    this.router.navigate(['garden']);
    console.log(formValues);

  }

  cancel() {
    this.route.snapshot.params['patchName'];
  }

}


