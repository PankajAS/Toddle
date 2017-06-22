import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'
import { filterData } from "../../data/filterData.interface";

/*
  Generated class for the FiltersServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class FiltersServiceProvider {
  age:{lower:string, upper:string}
  gender:string;
  male:Boolean;
  childGroups:any;
  filteredData:filterData;

  constructor(public http: Http) {
    this.filteredData = {age:this.age,child_gender:"M"};
    this.age = {lower:'2', upper:'5'};
  }

  //set filter age between
  setAgeFilter(ageFilter:any){
    this.age = ageFilter;
    this.filteredData = {age:this.age,child_gender:"M"};
    console.log(this.filteredData)
  }

  //get filter age
  getFilters():any{
    return this.age;
  }

  // set gender of child to filter data
  setGender(gender:any){
    this.gender = gender;
    this.filteredData = {age:this.age,child_gender:gender};
    console.log(this.filteredData)
  }

  //get filter list from popover
  filterData(data:any){
    console.log(this.filteredData)

    return data.filter((item) => {
    //  console.log(item)
   if(item.child_gender != null && this.filteredData.age == null) {
     return item.child_gender.toLowerCase().indexOf(this.filteredData.child_gender.toLowerCase()) > -1;
   }else if(item.child_age!= null && item.child_gender != null){
        return (item.child_gender.toLowerCase().indexOf(this.filteredData.child_gender.toLowerCase()) > -1
          && (item.child_age >= this.filteredData.age['lower']
        && item.child_age <= this.filteredData.age['upper']));
   }
    });
  }
}
