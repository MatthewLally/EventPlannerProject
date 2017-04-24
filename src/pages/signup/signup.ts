import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { NavController, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login'
import { Events } from '../../providers/events';
 
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
 
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  createSuccess = false;
 
  constructor(public nav: NavController, public http: Http, public eventService: Events, public  alertCtrl: AlertController) {
 
  }
 
  register(){
 
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
 
      let user = { //Let the user be equal to the data entered 
        name: this.name,
        username: this.username,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword
      };
 
      this.http.post('http://localhost:3000/auth/register', JSON.stringify(user), {headers: headers})
        .subscribe(res => {
          if (res){
            this.createSuccess = true;
            this.showPopup("Success Account  Created") //check response, if created show this message
          }
          this.eventService.init(res.json());
          this.nav.setRoot(LoginPage); //If logged in
        },
        (err) => {
          this.showPopup("Error, please make sure form is filled out correctly");
          console.log(err);
        }); 
 
  }

  showPopup(text) {
    let alert = this.alertCtrl.create({
      subTitle: text,
      buttons: [
       {
         text: 'OK',
         handler: data => {
           if (this.createSuccess) {
             this.nav.popToRoot();
           }
         }
       }
     ]
    });
    alert.present();
  }
}

