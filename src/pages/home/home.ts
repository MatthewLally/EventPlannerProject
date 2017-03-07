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
              finish: data.finish
            })
          }
        }
      ]
    });

    prompt.present();

  }
  
 
  updateEvent(event){
 
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
              let newTitle:String = data.title,
              let newType :String = data.type,
              let newStart :String = data.start,
              let newFinish:String =  data.finish,



               if(event.title ='')
               {
                 newTitle = event.title;
               }
               if(event.type ='')
               {
                 newType = event.title;
               }
               if(event.start != '')
               {
                 newStart = event.start;
               }
               if(event.finish != '')
               {
                 newFinish = event.finish;
               }
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
