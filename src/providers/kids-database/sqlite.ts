import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";
/*
  Generated class for the Sqlite provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
declare var window: any;
@Injectable()
export class Sqlite {
    public text: string = "";
    public db = null;
    public arr = [];
    constructor() {
        this.db = new SQLite();
    }
    /**
     * 
     * Open The Datebase
     */

    openDb() {
        this.db.create({ name: 'toddle.db', location: 'default' }).then((db: SQLiteObject) => {
            db.transaction((tx) => {

                //  tx.executeSql('CREATE TABLE IF NOT EXISTS kids_details (id INTEGER PRIMARY KEY AUTOINCREMENT, Kid_list TEXT, location_key TEXT)');
                //  tx.executeSql('CREATE TABLE IF NOT EXISTS location_table (id INTEGER PRIMARY KEY AUTOINCREMENT, locations TEXT, location_key TEXT)');
                tx.executeSql('CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY AUTOINCREMENT, locations TEXT)');
            });
        }).catch(e => {
            alert(e);
        });
    }

    /**
     * 
     * @param addItem for adding: function
     */
    addItem(locations) {
        return new Promise(resolve => {
            var InsertQuery = "INSERT INTO test (locations) VALUES (?)";

            this.db.create({ name: 'toddle.db', location: 'default' }).then((db: SQLiteObject) => {

                db.transaction((tx) => {
                    tx.executeSql(InsertQuery, [locations], (r) => {
                        this.getRows()
                            .then(s => {
                                resolve(s)
                            });
                    }, e => {
                        console.log('Inserted Error', e);
                        resolve(false);
                    })
                });

            }).catch(e => {
                alert(e);
            });

        })
    }

    //Refresh everytime
    getRows() {
        return new Promise(res => {
            this.arr = [];
            let query = "SELECT * FROM test";
            this.db.create({ name: 'toddle.db', location: 'default' }).then((db: SQLiteObject) => {
                db.transaction((tx) => {
                    tx.executeSql(query, [], (tx, rs) => {
                        if (rs.rows.length > 0) {
                            for (var i = 0; i < rs.rows.length; i++) {
                                var item = rs.rows.item(i);
                                this.arr.push(item);
                            }
                            res(this.arr);
                        }
                    }, (e) => {
                        console.log('Sql Query Error', e);
                    });
                });

            }).catch(e => {
                alert(e);
            });

        })
    }

    //to delete any Item
    /*   del(id) {
           return new Promise(resolve => {
               var query = "DELETE FROM Todo WHERE id=?";
               this
                   .db
                   .executeSql(query, [id], (s) => {
                       console.log('Delete Success...', s);
                       this
                           .getRows()
                           .then(s => {
                               resolve(true);
                           });
                   }, (err) => {
                       console.log('Deleting Error', err);
                   });
           })
       }*/

    //to Update any Item
    update(id, txt) {
        return new Promise(res => {
            var query = "UPDATE Todo SET todoItem=?  WHERE id=?";
            this.db.create({ name: 'toddle.db', location: 'default' }).then((db: SQLiteObject) => {
                db.transaction((tx) => {
                    tx.executeSql(query, [txt, id], (s) => {
                        console.log('Update Success...', s);
                        this.getRows().then(s => {
                            res(true);
                        });
                    }, (e) => {
                        console.log('Sql Query Error', e);
                    });
                });

            }).catch(e => {
                alert(e);
            });
        })

    }

}
