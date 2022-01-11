import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IPatch } from 'src/app/garden/models/ipatch-model';
import { PatchesService } from 'src/app/shared/patches.service';

@Component({
  selector: 'app-dialog-create-task',
  templateUrl: './dialog-create-task.component.html',
  styleUrls: ['./dialog-create-task.component.css']
})
export class DialogCreateTaskComponent implements OnInit {

  public static readonly CREATEPATCH_WEBSITE_URL: string = '/create-patch';
  // public static readonly CREATETASK_WEBSITE_URL: string = `/create-task', ${this.patchName}`;

  patchControl = new FormControl('', Validators.required);
  patchName!: string;
  public isLoading: boolean = false;
  patches!: IPatch[];

  constructor(public dialogRef: MatDialogRef<DialogCreateTaskComponent>,
    private patchService: PatchesService,
    private router: Router) { }

  ngOnInit(): void {
    this.patchService.getPatch().subscribe(allPatches => {
      this.patches = allPatches;
      this.isLoading = true;
    });
  }

  cancel() {
    this.dialogRef.close();
  }

  createPatch(){
  const link = document.createElement('a');
  link.href = DialogCreateTaskComponent.CREATEPATCH_WEBSITE_URL;
  link.setAttribute('visibility', 'hidden');
  link.click();
  }

  createTaskPage(patchName: string){
    this.router.navigate(['/create-task', patchName])
    this.dialogRef.close();
  }

}
