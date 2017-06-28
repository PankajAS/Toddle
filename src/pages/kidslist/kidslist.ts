import { Component, OnInit } from '@angular/core';

import childName from '../../data/childInfo';
import {
  AlertController, LoadingController, MenuController, NavController, NavParams,
  PopoverController
} from "ionic-angular";
import { ProfilePage } from "../profile/profile";
import { DetailsviewPage } from "../detailsview/detailsview";
import { KidsListServiceProvider } from "../../providers/kids-list-service/kids-list-service";
import { Storage } from "@ionic/storage";
import { LocationServiceProvider } from "../../providers/location-service/location-service";
import { LoginPage } from "../login/login";
import { PopoverContentPage } from "../popover/popover";
import { FiltersServiceProvider } from "../../providers/filters-service/filters-service";
import { Sqlite } from "../../providers/kids-database/sqlite";


@Component({
  selector: 'page-kidslist',
  templateUrl: 'kidslist.html',
})
export class KidslistPage implements OnInit {
  childName: { name: string, time: string, years: string, gender: string, avatar: string, icon: string }[];
  childList: any;
  filterChildList: any;
  isGrid: boolean;
  locationID: string;
  userDetails: { [k: string]: any } = {};
  myDate: any = new Date().toLocaleDateString();
  today: any;
  birth: any;
  user: any;
  menuItems: any;

  constructor(private navCtrl: NavController,
    public navParams: NavParams,
    public kidList: KidsListServiceProvider,
    public alertCtrl: AlertController,
    public loading: LoadingController,
    public storage: Storage,
    public location: LocationServiceProvider,
    private menu: MenuController,
    public popoverCtrl: PopoverController,
    public kidsDb: Sqlite,
    public filterData: FiltersServiceProvider) {

  }

  ionViewWillEnter() {

  }

  //open popover to filter child list
  openPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverContentPage, this.menuItems[this.locationID]);
    popover.present({
      ev: myEvent
    })

    popover.onDidDismiss(() => {
      this.filterChildList = this.filterData.filterData(this.childList);
    })
  }

  //on view did enter
  ionViewDidEnter() {
    this.menu.enable(true, 'menu1');
  }

  //on view did load
  ionViewDidLoad() {
    console.log("view")
    let loader = this.loading.create({
      content: "Loading..."
    });
    loader.present();

    //get params
    this.userDetails.data = this.navParams.data.data;
    this.userDetails.installation_key = this.navParams.data.installation_key;

    //get location from LocationServiceProvider service using api
    this.location.getLocation(this.userDetails.data.user_id, this.userDetails.data.token,
      this.userDetails.installation_key).then((data) => {
        this.menuItems = data
       
        this.kidsDb.addItem(this.menuItems).then((data)=>{
          console.log(data)
        })

        //get child list from KidsListServiceProvider using api
        this.kidList.getKidsList(this.userDetails.data.user_id, this.userDetails.data.token,
          this.menuItems[this.locationID].id, this.userDetails.installation_key).then((data) => {
            this.childList = data;
            this.filterChildList = this.childList;            
            loader.dismissAll()
          });
      });
  }


  ngOnInit(): void {
    this.childName = childName;
    this.isGrid = true;
    this.locationID = "0";
  }


  //navigation to child profile page
  goToProfile(name: {}) {
    this.navCtrl.push(ProfilePage, name);
  }

  //navigation to child info page
  goDetailsView(name: string) {
    this.navCtrl.push(DetailsviewPage, name);
  }

  //change list view to grid or list view
  changeView(isGrid: boolean) {
    this.isGrid = isGrid;
  }

  //get kids list by selected location from menu
  getKidListByLocation(location: string) {
    this.locationID = location;
    this.menu.close("menu1");
    let loader = this.loading.create({
      content: "Loading..."
    });
    loader.present();
    this.kidList.getKidsList(this.userDetails.data.user_id, this.userDetails.data.token,
      this.locationID, this.userDetails.installation_key).then((data) => {

        this.childList = data;
        this.filterChildList = this.childList;   
        loader.dismissAll();
      });
  }

  //logout
  logOut() {
    this.navCtrl.setRoot(LoginPage);
  }
}

