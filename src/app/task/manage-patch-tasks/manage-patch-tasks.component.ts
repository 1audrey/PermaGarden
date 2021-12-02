import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { PatchesService } from 'src/app/shared/patches.service';

@Component({
  selector: 'app-manage-patch-tasks',
  templateUrl: './manage-patch-tasks.component.html',
  styleUrls: ['./manage-patch-tasks.component.css']
})
export class ManagePatchTasksComponent implements OnInit {
  patch!: any;

  constructor(private patchService: PatchesService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.patch = this.patchService.getSinglePatch(this.route.snapshot.params['patchName']);
  }

  cancel() {
    this.router.navigate(['garden']);
  }

}
