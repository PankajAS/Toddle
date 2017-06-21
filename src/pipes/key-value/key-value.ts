import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the KeyValuePipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'key-value',
})
export class KeyValuePipe implements PipeTransform {
  transform(value, args:string[]) : any {
    let keys = [];
    for (let key in value) {
      keys.push({key: key.toLowerCase(), value: value[key].toLowerCase()});
    }
    return keys;
  }
}
