import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPatch } from '../../garden/models/ipatch-model';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  patches!: IPatch[];
  patchFromHomepage: boolean = true;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.patches = this.route.snapshot.data['patches'];
  }


}
