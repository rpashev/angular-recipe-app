import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: any, query: string) {
    if (value.length === 0 || !value) return;
    if (query === '') return value;
    return value.filter((recipe: any) => {
      if (recipe?.title.toLowerCase().includes(query.toLowerCase())) {
        return true;
      }

      if (
        recipe?.tags.some((tag: any) =>
          tag.toLowerCase().includes(query.toLowerCase())
        )
      ) {
        return true;
      }
      return false;
    });
  }
}
