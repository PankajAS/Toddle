import {Component, OnInit} from '@angular/core';

import childName from '../../data/childInfo';
import {AlertController, NavController} from "ionic-angular";
import {ProfilePage} from "../profile/profile";
import {DetailsviewPage} from "../detailsview/detailsview";
import {TodosProvider} from "../../providers/todos/todos";
import { LoginServiceProvider } from '../../providers/login-service/login-service';


@Component({
  selector: 'page-kidslist',
  templateUrl: 'kidslist.html',
})
export class KidslistPage implements OnInit{
  childName:{name:string,time:string, years:string, gender:string, avatar:string, icon:string}[];
  isGrid:boolean;
  image:string;
  todos: any;


  constructor(private navCtrl:NavController, public todoService: TodosProvider,public alertCtrl: AlertController){}

  ionViewDidLoad(){

    this.todoService.getTodos().then((data) => {
      this.todos = data;
      console.log(data);
    });

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


  goToProfile(name:string){
    this.navCtrl.push(ProfilePage, name);
  }

  goDetailsView(name:string){
    this.navCtrl.push(DetailsviewPage, name);
  }
  changeView(isGrid:boolean){
    this.isGrid = isGrid;
  }
}
