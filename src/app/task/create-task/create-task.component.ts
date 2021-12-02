import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IPlantsList } from 'src/app/garden-list/models/iplants-model';
import { IPatch } from 'src/app/garden/models/ipatch-model';
import { PatchesService } from 'src/app/shared/patches.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {
  isDirty: boolean = true;
  newTask!: any;
  patchName!: string;
  selectedPlant!: IPlantsList;
  patch!:IPatch;

  constructor(
    private dialogRef: MatDialogRef<CreateTaskComponent>,
    private patchService: PatchesService,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: {patch: IPatch},
    )
    {
      this.patch = data.patch;
    }

  ngOnInit(): void {

  }

  cancel(){
    this.dialogRef.close();
    }


}


