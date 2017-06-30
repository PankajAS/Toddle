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
    public tableNames = { kidsTable: 'kids_details', locationTable: 'location_table', userTable: 'user_info' };
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
                tx.executeSql('CREATE TABLE IF NOT EXISTS ' + this.tableNames.kidsTable + ' (location_key TEXT NOT NULL, kidList TEXT, PRIMARY KEY (location_key))');
                tx.executeSql('CREATE TABLE IF NOT EXISTS ' + this.tableNames.locationTable + ' (location_key TEXT NOT NULL, locations TEXT, PRIMARY KEY (location_key))');
                tx.executeSql('CREATE TABLE IF NOT EXISTS ' + this.tableNames.userTable + ' (user_id INTEGER, password TEXT, city_key TEXT NOT NULL, token TEXT, PRIMARY KEY(city_key))');
            });
        }).catch(e => {
            alert(e);
        });
    }

    /**
     * 
     * @param addSection for adding: function
     */
    addUserInfo(userInfo) {
        var select = "SELECT * from user_info WHERE city_key=? AND user_id=?";
        var InsertQuery = "INSERT INTO user_info (user_id, password, city_key, token ) VALUES (?, ?, ?, ?)";
        return new Promise((resolve) => {
            this.db.create({ name: 'toddle.db', location: 'default' }).then((db: SQLiteObject) => {
                db.transaction((tx) => {
                    tx.executeSql(select, [userInfo.location_key, userInfo.userId], (tx, rs) => {
                        if (rs.rows.length > 0) {
                            console.log('update' + userInfo.city_key + userInfo.user_id)
                            console.log(rs.rows.Item)

                            this.getRows(this.tableNames.userTable)
                                .then(s => {
                                    resolve(s)
                                });

                        } else {
                            this.db.create({ name: 'toddle.db', location: 'default' }).then((db: SQLiteObject) => {
                                db.transaction((tx) => {
                                    tx.executeSql(InsertQuery, [userInfo.userId, userInfo.password, userInfo.location_key, userInfo.token], (r) => {
                                        this.getRows(this.tableNames.userTable)
                                            .then(s => {
                                                resolve(s)
                                            });
                                    }, (e) => {
                                        resolve(false);
                                    })
                                });
                            }).catch(e => {
                                alert(e);
                            });
                        }
                    })
                })
            });
        })
    }

    addLocation(locations, location_key) {
        return new Promise(resolve => {
       var select = "SELECT * from " + this.tableNames.locationTable + " WHERE location_key=?";
        var InsertQuery = "INSERT INTO " + this.tableNames.locationTable + " (location_key, locations) VALUES (?, ?)";
        new Promise((resolve) => {
            this.setValueToDb(select, InsertQuery, locations, location_key).then((data) => {
                resolve(data);
            })
        })
        })
    }

    addKidsList(kidslist, location_key) {
        var select = "SELECT * from " + this.tableNames.kidsTable + " WHERE location_key=?";
        var InsertQuery = "INSERT INTO " + this.tableNames.kidsTable + " (location_key, kidList) VALUES (?, ?)";
        new Promise((resolve) => {
            this.setValueToDb(select, InsertQuery, kidslist, location_key).then((data) => {
                resolve(data);
            })
        })
    }

    setValueToDb(select, InsertQuery, data, location_key) {
        return new Promise((resolve) => {
            this.db.create({ name: 'toddle.db', location: 'default' }).then((db: SQLiteObject) => {
                db.transaction((tx) => {
                    tx.executeSql(select, [location_key], (tx, rs) => {
                        if (rs.rows.length > 0) {
                            this.update(location_key, data).then((data) => {
                                resolve(data)
                            })
                        } else {
                            this.db.create({ name: 'toddle.db', location: 'default' }).then((db: SQLiteObject) => {
                                db.transaction((tx) => {
                                    tx.executeSql(InsertQuery, [location_key, data], (r) => {
                                        this.getRows("location_table")
                                            .then(s => {
                                                resolve(s)
                                            });
                                    }, (e) => {
                                        resolve(false);
                                    })
                                });

                            }).catch(e => {
                                alert(e);
                            });
                        }
                    })
                })
            });
        })
    }



   /**
     * 
     * @param getSection for get: function
     * 
     */
    getUserInfo() {
        return new Promise((resolve) => {
            this.getRows(this.tableNames.userTable).then((data) => {
                resolve(data);
            });
        })
    }

    getLocations() {
        //   var select = "SELECT * from location_table WHERE location_key=?";
        //    var InsertQuery = "INSERT INTO location_table (location_key, locations) VALUES (?, ?)";

        return new Promise((resolve) => {
            this.getRows(this.tableNames.locationTable).then((data) => {
                resolve(data);
            });
        })
    }

    getkidList() {
        return new Promise((resolve) => {
            this.getRows(this.tableNames.kidsTable).then((data) => {
                resolve(data);
            });
        })
    }

    //Refresh everytime
    getRows(table: string) {
        return new Promise(res => {
            this.arr = [];
            let query = "SELECT * FROM " + table;
            this.db.create({ name: 'toddle.db', location: 'default' }).then((db: SQLiteObject) => {
                db.transaction((tx) => {
                    tx.executeSql(query, [], (tx, rs) => {
                        if (rs.rows.length > 0) {
                            for (var i = 0; i < rs.rows.length; i++) {
                                var item = rs.rows.item(i);
                                this.arr.push(item);
                            }
                            res(this.arr);
                        } else {
                            res(false)
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


    /**
     * 
     * @param deleteSection for del: function
     * 
     */
    del(id) {
        return new Promise(resolve => {
            var query = "DELETE FROM Todo WHERE id=?";
            this
                .db
                .executeSql(query, [id], (s) => {
                    console.log('Delete Success...', s);
                    this.getRows("table").then(s => {
                        resolve(true);
                    });
                }, (err) => {
                    console.log('Deleting Error', err);
                });
        })
    }



      /**
     * 
     * @param updateSection for update: function
     * 
     */
    update(id, txt) {
        return new Promise(res => {
            var query = "UPDATE location_table SET locations=?  WHERE location_key=?";
            this.db.create({ name: 'toddle.db', location: 'default' }).then((db: SQLiteObject) => {
                db.transaction((tx) => {
                    tx.executeSql(query, [txt, id], (s) => {
                        // console.log('Update Success...', s);
                        this.getRows("location_table").then(s => {
                            res(s);
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
