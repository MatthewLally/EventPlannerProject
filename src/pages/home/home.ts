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
        },
        {
          name: 'type'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: data => {
            this.eventService.createEvent({
              title : data.title,
              type : data.type
            })
          }
        }
      ]
    });

    prompt.present();

  }
  /** createEvent(){
 
    let prompt = this.alertCtrl.create({
      title: 'Add Event',
      inputs: [
        {
          name: 'place',
          placeholder: "Event location"
        },
        {
          name: 'type',
          placeholder: "Type of event"
        },
        {
          name: 'time',
          placeholder : "Event start time"
        },
        {
          name: 'finish',
          placeholder : "Event finish time"
        }

      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: data => {
            this.eventService.createEvent({place: data.place}), ({type: data.type}), ({start: data.start}), ({finish : data.finish}) ;
          }
        }
      ]
    });
 
    prompt.present();
 
  }
  */
  
 
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
 
}
