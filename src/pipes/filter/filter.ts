import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the FilterPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  name:string[];
  transform(items: any[], args:string) {
    if (!items)
      return items;
   if(args === undefined)
      return items;

  //  this.name = args.split(" ");
 //   return items.filter(item => item.child_first_name.toLowerCase().indexOf(this.name[0])!= -1
 //   || item.child_last_name.toLowerCase().indexOf(this.name[1])!= -1);
    return items.filter(item => item.child_full_name.toLowerCase().indexOf(args)!= -1)
  }
}
