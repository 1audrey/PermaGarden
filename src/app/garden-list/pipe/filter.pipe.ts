import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'plantFilter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, searchValue: string): any {

    if (!searchValue) return value;
    return value.filter((v: { imageUrl: string; }) => v.imageUrl.toLowerCase().indexOf(searchValue.toLowerCase()) > -1)

  }

}
