import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { PermagardenAppComponent } from './permagarden-app.component';
import { GardenListComponent } from './garden-list/garden-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon'


@NgModule({
  declarations: [
    PermagardenAppComponent,
    GardenListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatDividerModule,
    MatGridListModule,
    MatIconModule


  ],

  bootstrap: [PermagardenAppComponent]
})
export class AppModule { }
