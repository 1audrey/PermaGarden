import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IPlantsList } from 'src/app/garden-list/models/iplants-model';
import { IPatch } from 'src/app/garden/models/ipatch-model';
import { PatchesService } from 'src/app/shared/patches.service';
import { DateAdapter } from '@angular/material/core';

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

  @Input() patch!: IPatch;

  tasks: TasksMethods[] = [
    { value: 'Sowing in pots' },
    { value: 'Sowing in soil' },
    { value: 'Planting' },
    { value: 'Other' }
  ];

  constructor(private patchService: PatchesService, private route: ActivatedRoute,
    private dateAdapter: DateAdapter<Date>
    ){
      this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy

    }

  ngOnInit(): void {
    this.patch = this.patchService.getSinglePatch(this.route.snapshot.params['patchName']);
  }


}

interface TasksMethods {
  value: string;
}

