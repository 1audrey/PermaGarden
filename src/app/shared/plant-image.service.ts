import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IPlantsImage } from '../garden-list/models/iplants-image-model';

@Injectable()
export class PlantImageService {
  getPlantsImage(): Observable<IPlantsImage[]>{
    let subject = new Subject<IPlantsImage[]>()
    setTimeout(() => {subject.next(IMAGE); subject.complete();},
    100)

    return subject;
  }
}

  const IMAGE: IPlantsImage[] =
  [
    {
      title: 'Green Beans',
      imageUrl: 'assets/images/green-beans.jpg'
    },
    {
      title:'Navy Beans',
      imageUrl:'assets/images/navy-beans.jpg'
    },
    {
      title: 'Spring Onions',
      imageUrl: 'assets/images/spring-onions.jpg'
    },
    {
      title:'Carrots',
      imageUrl:'assets/images/carrots.jpg'
    },
    {
      title:'Navy Beans',
      imageUrl:'assets/images/navy-beans.jpg'
    },
  ];

