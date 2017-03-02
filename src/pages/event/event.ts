import { Component } from "@angular/core";
import { NavController, AlertController, ModalController } from 'ionic-angular';
import { Events } from '../../providers/events';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-event',
  templateUrl: 'event.html'
})
export class EventPage {


  constructor(public nav: NavController, public eventService: Events, public alertCtrl: AlertController) {}

}

