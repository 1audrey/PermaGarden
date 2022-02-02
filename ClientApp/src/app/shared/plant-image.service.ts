import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IPlantsImage } from '../garden-list/models/iplants-image-model';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class PlantImageService {
  baseUrl = 'https://localhost:5001'

  constructor(private http: HttpClient) { }

  public getAllPlantsImages(): Observable<IPlantsImage[]> {
    return this.http.get<IPlantsImage[]>(this.baseUrl + '/Plants/all-plants-images');
  }
}


