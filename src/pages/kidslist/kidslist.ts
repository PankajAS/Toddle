import {Component, OnInit} from '@angular/core';

import childName from '../../data/childInfo';
import {NavController} from "ionic-angular";
import {ProfilePage} from "../profile/profile";


@Component({
  selector: 'page-kidslist',
  templateUrl: 'kidslist.html',
})
export class KidslistPage implements OnInit{
  childName:{name:string,time:string, years:string, gender:string, avatar:string, icon:string}[];

  constructor(private navCtrl:NavController){}
  ngOnInit(): void {
    this.childName =childName;
  }

  goToProfile(name:string){
    this.navCtrl.push(ProfilePage, name);
  }
}
