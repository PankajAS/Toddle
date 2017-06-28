import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {SQLite, SQLiteObject } from "@ionic-native/sqlite";
/*
  Generated class for the KidsDatabaseProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class KidsDatabaseProvider {
  public database:SQLite;

  constructor(public sqlite: SQLite) {
    this.database = new SQLite();

  }

  createDatabase(){
    this.database.create({
      name: "kids.db",
      location: "default"
    }).then((db: SQLiteObject) => {     

      db.transaction((tx)=>{
        tx.executeSql('CREATE TABLE IF NOT EXISTS kids_details (id INTEGER PRIMARY KEY AUTOINCREMENT, Kid_list TEXT, location_key TEXT)');
        tx.executeSql('CREATE TABLE IF NOT EXISTS location_table (id INTEGER PRIMARY KEY AUTOINCREMENT, locations TEXT, location_key TEXT)');
       
      })    

    }).catch(e =>{
      alert(e);
    });
  }


  insertData(){
    this.database.create({
      name: "kids.db",
      location: "default"
    }).then((db:SQLiteObject)=>{
      
      db.executeSql("INSERT INTO kids_details(locations) VALUES ('TEST')",[]).then((data)=>{
         alert("INSERTED: " + JSON.stringify(data));
      });

    });   

  }

}
