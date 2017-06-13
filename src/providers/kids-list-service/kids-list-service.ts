import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Headers } from '@angular/http';

/*
  Generated class for the KidsListServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class KidsListServiceProvider {
  url = 'http://kdv-api-acceptatie.kdv1.tactics.be/location/';

  constructor(public http: Http) {}

  getKidsList(userId:string, token:string){
    return new Promise(resolve => {
      var header = new Headers();
      header.append('Content-Type', 'application/json');
      this.http.get(this.url + '5/day/2017-06-12/user/' + userId + '/token/' + token + '/children', {headers: header})
        .map(res => res.json())
        .subscribe(data => {
            resolve(data);
          },
          error => alert(error),
          () => console.log("Finished")
        );
    });
  }

}
