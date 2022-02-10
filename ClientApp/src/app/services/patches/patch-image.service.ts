import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPatchShape } from '../../garden/models/ipatch-shape';


@Injectable({
  providedIn: 'root'
})
export class PatchImageService {
  baseUrl = 'https://localhost:5001/Patches/'

  constructor(private http: HttpClient) { }

  public getAllPatchesImages(): Observable<IPatchShape[]> {
    return this.http.get<IPatchShape[]>(this.baseUrl + 'all-patches-shapes');
  }
}
