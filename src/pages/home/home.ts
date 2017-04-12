import { Component } from "@angular/core";
import { NavController, AlertController, ModalController } from 'ionic-angular';
import { Events } from '../../providers/events';
import { LoginPage } from '../login/login';



 
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
      message: 'Add your Event',
      inputs: [
        {
          name: 'title',
          placeholder: " Event Name "
        },
        {
          name: 'type',
          placeholder: "Event type (wedding etc)"
        },
        {
          name: 'start',
        placeholder: "Event Start Time"
      },
      {
        name: 'finish',
        placeholder : "Event Finish Time"
      },
      {
        name: 'location',
        placeholder : "Event Location"
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
              type : data.type,
              start : data.start,
              finish: data.finish,
              location: data.location
            })
          }
        }
      ]
    });

    prompt.present();

  } 
  
 
  updateEvent(event):void{
 
    let prompt = this.alertCtrl.create({
      title: 'Edit',
      message: 'Updating your event?',
      inputs: [
        {
          name: 'title',
          placeholder: event.title
        },
        {
          name: 'type',
          placeholder: event.type
        },
        {
          name : 'start',
          placeholder: event.start
        },
        {
          name :'finish',
          placeholder : event.finish
        },
        {
          name : 'location',
          placeholder : event.location
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
              title : data.title,
              type : data.type,
              start : data.start,
              finish : data.finish,
              location : data.location





              
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
