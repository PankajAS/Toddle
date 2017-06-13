import {Component, OnInit} from '@angular/core';

import childName from '../../data/childInfo';
import {AlertController, LoadingController, MenuController, NavController, NavParams} from "ionic-angular";
import {ProfilePage} from "../profile/profile";
import {DetailsviewPage} from "../detailsview/detailsview";
import {TodosProvider} from "../../providers/todos/todos";
import {KidsListServiceProvider} from "../../providers/kids-list-service/kids-list-service";
import {Storage} from "@ionic/storage";
import {LocationServiceProvider} from "../../providers/location-service/location-service";
import {LoginPage} from "../login/login";


@Component({
  selector: 'page-kidslist',
  templateUrl: 'kidslist.html',
})
export class KidslistPage implements OnInit{
  childName:{name:string,time:string, years:string, gender:string, avatar:string, icon:string}[];
  childList:any;
  isGrid:boolean;
  image:string;
//  todos: any;
  userDetails:any;
  myDate:any  = new Date().toLocaleDateString();
  today:any;
  birth:any;
  user:any;
  menuItems:any;

  constructor(private navCtrl:NavController,
              public navParams: NavParams,
              public kidList: KidsListServiceProvider,
              public todoService: TodosProvider,
              public alertCtrl: AlertController,
              public loading: LoadingController,
              public storage: Storage,
              public location: LocationServiceProvider,
              private menu: MenuController){
  }
  ionViewDidEnter() {
    this.menu.enable(true, 'menu1');
  }

  ionViewDidLoad(){
    console.log("view")
    let loader = this.loading.create({
      content: "Loading..."
    });
    loader.present();
    //get params
    this.userDetails = {"userId":this.navParams.get("user_id"),"token":this.navParams.get("token")};

    //get location from LocationServiceProvider service using api
    this.location.getLocation(this.userDetails.userId,this.userDetails.token).then((data)=>{
      this.menuItems = data;

      //get child list from KidsListServiceProvider using api
      this.kidList.getKidsList(this.userDetails.userId, this.userDetails.token, this.menuItems[0].id).then((data) =>{
        this.childList = data;
        console.log(this.childList[0]);
        loader.dismissAll();
      });
    });

//    this.todoService.getTodos().then((data) => {
//      this.todos = data;
//      console.log(data);
//    });

//    this.login.login("api.test@tactics.be","passw").then((data)=>{
//      console.log(data);
//    });
  }

  ngOnInit(): void {
    this.childName = childName;
    this.isGrid = true;
    this.image = "../../assets/grid.png";
  }

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

  //navigation to child profile page
  goToProfile(name:{}){
    this.navCtrl.push(ProfilePage, name);
  }

  //navigation to child info page
  goDetailsView(name:string){
    this.navCtrl.push(DetailsviewPage, name);
  }

  //change list view to grid or list view
  changeView(isGrid:boolean){
    this.isGrid = isGrid;
  }

  //get kids list by selected location from menu
  getKidListByLocation(location:string){
    this.menu.close("menu1");
    let loader = this.loading.create({
      content: "Loading..."
    });
    loader.present();
    this.kidList.getKidsList(this.userDetails.userId, this.userDetails.token, location).then((data) =>{
      this.childList = data;
      console.log(this.childList[0]);
      loader.dismissAll();
    });
  }

  //logout
  logOut(){
    this.navCtrl.setRoot(LoginPage);
  }
}

