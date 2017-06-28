import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  name:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.name = this.navParams.data;
    console.log(this.name)
    
  }

  ionViewDidLoad() {
  }

  displayDate:any;
  year:any
  getBirthday(birthday:string){
     let a = birthday.split(" ");
    var objDate = new Date(a[0]),
      locale = "en-us",
      month = objDate.toLocaleString(locale, { month: "long" });
    //let date = new Date(birthday);

    var dateString = birthday;
    var date = new Date(dateString.replace(' ', 'T'));

    this.displayDate = date.getDay();
    this.year = date.getFullYear();
    return this.getGetOrdinal(this.displayDate)+" "+month+" "+this.year;
  }

  getGetOrdinal(n){
  var s=["th","st","nd","rd"],
    v=n%100;
  return n+(s[(v-20)%10]||s[v]||s[0]);
}

}
