import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { NavController, AlertController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { HomePage } from '../home/home';
import { Events } from '../../providers/events';
import { AboutPage } from '../about/about';
 
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
 
  username: string;
  password: string;
  loginSuccess = false;
 
  constructor(public nav: NavController, public http: Http, public eventService: Events, public  alertCtrl: AlertController) {
 
  }
 
  login(){
 
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
 
      let credentials = {
        username: this.username,
        password: this.password
      };
 
      this.http.post('http://localhost:3000/auth/login', JSON.stringify(credentials), {headers: headers})
        .subscribe(res => {
          if (res){
             this.loginSuccess = true;
            this.showPopup("Succesfully logged in")

          }
          this.eventService.init(res.json());
          this.nav.setRoot(HomePage);
        }, (err) => {
         this.showPopup("Error, please make sure user credentials are correct");
        });
 
  }
   showPopup(text) {
    let alert = this.alertCtrl.create({
      subTitle: text,
      buttons: [
       {
         text: 'OK',
         handler: data => {
         }
       }
     ]
    });
    alert.present();
  }
 
  launchSignup(){
    this.nav.push(SignupPage);
  }

  aboutPage(){
    this.nav.push(AboutPage);
  }
 
}
