import {Component, OnInit} from '@angular/core';
import {ModalController, ViewController} from 'ionic-angular';
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

  constructor(public viewCtrl: ViewController, public filterservice:FiltersServiceProvider, public modalCtrl:ModalController) {

  }
  ngOnInit(): void {
    this.structure = { lower: 0, upper: 6 };
  }

  changes(){

    this.filterservice.setAgeFilter(this.structure);
    console.log(this.filterservice.getFilters())

  }
  close() {
    this.viewCtrl.dismiss();
  }

  chooseGroup(){
    let profileModal = this.modalCtrl.create(PopupModelPage);
    profileModal.present();
  }

}
