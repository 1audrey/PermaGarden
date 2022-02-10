import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IPlantsImage } from '../../garden-list/models/iplants-image-model';


@Injectable()
export class PlantImageService {
  baseUrl = 'https://localhost:5001/Plants/'

  constructor(private http: HttpClient) { }

  public getAllPlantsImages(): Observable<IPlantsImage[]> {
    return this.http.get<IPlantsImage[]>(this.baseUrl + 'all-plants-images');
  }
}


