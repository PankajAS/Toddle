import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Headers } from '@angular/http';

/*
  Generated class for the LocationServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LocationServiceProvider {
  url = 'http://kdv-api-acceptatie.kdv1.tactics.be/';


  constructor(public http: Http) {
  }

  getLocation(userId:string,token:string,cityKey:string){
    return new Promise(resolve => {
      var header = new Headers();
      header.append('Content-Type', 'application/json');
      this.http.get(this.url+'city/'+ cityKey +'/'+'user/'+userId + '/token/' + token + '/locations', {headers: header})
        .map(res => res.json())
        .subscribe(data => {
            resolve(data);
          },
          error => console.log(error),
          () => console.log("Finished")
        );
    });
  }

}
