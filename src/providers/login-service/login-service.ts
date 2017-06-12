import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {AlertController} from "ionic-angular";

/*
  Generated class for the LoginServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LoginServiceProvider {
posts:any;
baseUrl = "http://kdv-api-acceptatie.kdv1.tactics.be/user/18555/token/51bbc8ccd69424aa3e61a9786ad2c0e9/locations"
  constructor(public http: Http,public alertCtrl: AlertController) {

  }

  login(email:string, password:string) {
    return new Promise(resolve => {
      var json = JSON.stringify({ email: email, password: password });
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post('http://kdv-api-acceptatie.kdv1.tactics.be/login',
        json, {
          headers: headers
        })
        .map(res => res.json())
        .subscribe(data => {
            this.posts = data;
            resolve(this.posts);
          },
          error => alert(error),
          () => console.log("Finished")
        );
    });
  }

}
