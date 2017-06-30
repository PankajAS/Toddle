import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {AlertController} from "ionic-angular";
import { Sqlite } from "../../providers/kids-database/sqlite";

/*
  Generated class for the LoginServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LoginServiceProvider {
posts:any;
baseUrl = "http://kdv-api-acceptatie.kdv1.tactics.be/login";

  constructor(public http: Http,
              public alertCtrl: AlertController, 
              public sqlite:Sqlite) { }


  //login service method
  login(email:string, password:string, cityKey:string) {
    return new Promise(resolve => {
      var json = JSON.stringify({ email: email, password: password});
      var headers = new Headers();
      headers.append("city_key",cityKey);
      headers.append('Content-Type', 'application/json');
      this.http.post(this.baseUrl,
        json, {
          headers: headers
        })
        .map(res => res.json())
        .subscribe(data => {
            this.posts = data;     
            console.log(this.posts)   
            this.sqlite.addUserInfo({"userId":this.posts.user_id,"token":this.posts.token,"location_key":cityKey,"password":password})
            .then((data)=>{    
              console.log(data)       
            })                                    
            resolve(this.posts);
          },
          error => alert(error),
          () => console.log("Finished")
        );
    });
  }

}
