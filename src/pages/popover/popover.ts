import {Component, OnInit} from '@angular/core';
import {ModalController, NavParams, ViewController} from 'ionic-angular';
import {FiltersServiceProvider} from "../../providers/filters-service/filters-service";
import {PopupModelPage} from "../popup-model/popup-model";

/**
 * Generated class for the PopoverPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class PopoverContentPage implements OnInit{

  structure: any
  child_groups:{}={};
  child_groups_array = [{}];
  color:boolean
  filterData:{} ={};

  constructor(public viewCtrl: ViewController,
              public filterservice:FiltersServiceProvider,
              public modalCtrl:ModalController,
              public params: NavParams) {
    this.color = true;

  }

  selectGender(gender:string){
    if(gender=="M") {
      this.color = true;
    }else{
      this.color = false;
    }
    this.filterservice.setGender(gender);
    this.filterData["child_gender"] = gender;

  }

  id:string
  ngOnInit(): void {
    this.structure = {lower: 2, upper: 5};

    for (let data of this.params.data.child_group) {

      if (data.child_group_id) {
        this.id = data.child_group_id;
        this.child_groups[data.child_group_id]

      } else if (data.child_group_name) {

        this.child_groups[this.id] = data.child_group_name;
        this.child_groups_array.push(this.child_groups);
        this.child_groups = {};

      }
    }

    this.child_groups_array.splice(0,1)

  }



   changes()
    {
      this.filterservice.setAgeFilter(this.structure);
    }

    close()
    {
      this.viewCtrl.dismiss();
    }

    chooseGroup()
    {
      let profileModal = this.modalCtrl.create(PopupModelPage, this.child_groups_array);
      profileModal.present();
    }

}
