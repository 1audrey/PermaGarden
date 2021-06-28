import { Component } from '@angular/core';
import { MatCardModule} from '@angular/material/card';

@Component({
  selector: 'permagarden-app',
  template: `<h1> My Perma Garden </h1>
  <img src="/assets/images/favicon.ico">
  <app-garden-list></app-garden-list>
  `
})
export class PermagardenAppComponent {
  title = 'PermaGarden';
}
