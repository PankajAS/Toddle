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
import { Network } from '@ionic-native/network';


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
    public filterData: FiltersServiceProvider,
    public network: Network) {

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
    this.network.onDisconnect().subscribe(() => {
      console.log('network was disconnected :-(');
    });

    this.network.onConnect().subscribe((data) => {
      console.log(data.type);

      // We just got a connection but we need to wait briefly
      // before we determine the connection type. Might need to wait.
      // prior to doing any api requests as well.
      setTimeout(() => {
        if (this.network.type === 'wifi') {
          console.log('we got a wifi connection, woohoo!');
        }
      }, 3000);
    });
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


<<<<<<< HEAD
      //get child list from KidsListServiceProvider using api
      this.kidList.getKidsList(this.userDetails.data.user_id, this.userDetails.data.token,
        this.menuItems[this.locationID].id, this.userDetails.installation_key).then((data) =>{
        this.childList = data;
        this.filterChildList = this.childList;
        console.log(this.childList[0]);
        loader.dismissAll()
      });
    });
=======
    if (this.network.type != 'none') {
    
      //get location from LocationServiceProvider service using api
      this.location.getLocation(this.userDetails.data.user_id, this.userDetails.data.token,
        this.userDetails.installation_key).then((data) => {
          if(data !=null){
          this.menuItems = data

          //store and update location data in DataBase
          this.kidsDb.addLocation(data, this.userDetails.installation_key).then((data) => {
            if (data) {
              //  this.menuItems = JSON.parse(data[0].locations);
              //  console.log(this.menuItems)
              console.log("Updated")
            }
          })

          //get child list from KidsListServiceProvider using api
          this.kidList.getKidsList(this.userDetails.data.user_id, this.userDetails.data.token,
            this.menuItems[this.locationID].id, this.userDetails.installation_key).then((data) => {
              this.childList = data;
              console.log(this.childList)
              this.filterChildList = this.childList;
              this.kidsDb.addKidsList(this.childList, this.userDetails.installation_key)
              loader.dismissAll();
            });
          }else
          {
             loader.dismissAll()
          }
        });
    } else {
>>>>>>> 6941ac2097fc02803649770b9187f82718cfbc3d

      this.kidsDb.getLocations().then((data) => {
        this.menuItems = JSON.parse(data[0].locations);
        
        loader.dismissAll()
      })

    }
  }

  ngOnInit(): void {
    this.childName = childName;
    this.isGrid = true;
    this.locationID = "0";
  }

<<<<<<< HEAD
  createTodo(){
    let prompt = this.alertCtrl.create({
      title: 'Add',
      message: 'What do you need to do?',
      inputs: [
        {
          name: 'title',
        },
        {
          name: 'name',
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: data => {
            this.todoService.createTodo({title: data.title, name:data.name});
            this.todoService.getTodos().then((data) => {
              let prompt2 = this.alertCtrl.create({
                title: "data",
                message:data[0].title
              });
              prompt2.present();
            });
          }
        }
      ]
    });

    prompt.present();

  }

  updateTodo(todo){

    let prompt = this.alertCtrl.create({
      title: 'Edit',
      message: 'Change your mind?',
      inputs: [
        {
          name: 'title'
        },
        {
          name: 'name'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: data => {
            this.todoService.updateTodo({
              _id: todo._id,
              _rev: todo._rev,
              title: data.title,
              name: data.name
            });
          }
        }
      ]
    });
    prompt.present();
  }

  deleteTodo(todo){
    this.todoService.deleteTodo(todo);
  }


  //calculating child age from birth date
  calculateAge(date:string){
    this.today = new Date(this.myDate);
    this.birth = new Date(date);
    var ms = this.today.getTime()-this.birth.getTime();
    var second = ms/1000;
    var minutes = second/60;
    var hours = minutes/60;
    var days = hours/24;
    var years = days/365;
    return Math.round(years);
  }
=======
>>>>>>> 6941ac2097fc02803649770b9187f82718cfbc3d

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

