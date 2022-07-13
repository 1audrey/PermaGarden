import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'plantFilter' })
export class MockPipe implements PipeTransform {
  transform(value: any, searchValue: string): any {
    if (!searchValue) return value;
    return value.filter((v: { plantImagePicture: string; }) => v.plantImagePicture.toLowerCase().indexOf(searchValue.toLowerCase()) > -1)
  }
}

