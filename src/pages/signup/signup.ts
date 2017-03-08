import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
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
 
  constructor(public nav: NavController, public http: Http, public eventService: Events, public  alertCtrl) {
 
  }
 
  register(){
 
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
 
      let user = {
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
            this.showPopup("Succes Account  Created")
          }
          this.eventService.init(res.json());
          this.nav.setRoot(HomePage);
        },
        (err) => {
          this.showPopup("Error");
          console.log(err);
        }); 
 
  }

  showPopup(text) {
    let alert = this.alertCtrl.create({
      title: title,
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
 
}
