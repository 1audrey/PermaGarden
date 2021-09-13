import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, searchValue: string): any {

    if (!searchValue) return value;
    return value.filter((v: { title: string; imageUrl: string; }) => v.title.toLowerCase().indexOf(searchValue.toLowerCase()) > -1 || v.imageUrl.toLowerCase().indexOf(searchValue.toLowerCase()) > -1)

  }

}
