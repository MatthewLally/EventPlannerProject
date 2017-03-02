import { Component } from "@angular/core";
import { NavController, AlertController, ModalController } from 'ionic-angular';
import { Events } from '../../providers/events';
import { HomePage } from '../home/home';

/*
  Generated class for the Event page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-event',
  templateUrl: 'event.html'
})
export class EventPage {

  constructor(public nav: NavController, public eventService: Events, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventPage');
  }

}
