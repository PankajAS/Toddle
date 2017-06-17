import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the FiltersServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class FiltersServiceProvider {
  age:any;
  male:Boolean;
  childGroups:any;

  constructor(public http: Http) {

  }

  setAgeFilter(ageFilter:any){
    this.age = ageFilter;
  }

  getFilters():any{
    return this.age;
  }

}
