import { Component } from "@angular/core";
import { NavController, AlertController, ModalController } from 'ionic-angular';
import { Events } from '../../providers/events';
import { LoginPage } from '../login/login';
import { EventPage } from '../event/event';
 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 
  events: any;
 
  constructor(public nav: NavController, public eventService: Events, public alertCtrl: AlertController, private modalCtrl: ModalController) {
 
  }
 
  ionViewDidLoad(){
 
    this.eventService.getEvents().then((data) => {
      this.events = data;
    });
 
  }
 
  logout(){
    this.eventService.logout();
    this.events = null;
    this.nav.setRoot(LoginPage);
  }
 
  createEvent(){
 
    let prompt = this.alertCtrl.create({
      title: 'Add',
      message: 'What do you need to do?',
      inputs: [
        {
          name: 'title'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: data => {
            this.eventService.createEvent({title: data.title});
          }
        }
      ]
    });
 
    prompt.present();
 
  }
 
  updateEvent(event){
 
    let prompt = this.alertCtrl.create({
      title: 'Edit',
      message: 'Change your mind?',
      inputs: [
        {
          name: 'title'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: data => {
            this.eventService.updateEvent({
              _id: event._id,
              _rev: event._rev,
              title: data.title
            });
          }
        }
      ]
    });
 
    prompt.present();
  }
 
  deleteEvent(event){
    this.eventService.deleteEvent(event);
  }
  showEvent() {
    this.nav.push(EventPage);
    }
 
}
