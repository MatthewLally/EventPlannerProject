import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';

@Injectable()
export class Events {

  data: any;
  db: any;
  remote: any;

  constructor() {

  }
  //Initilise function

  init(details){ //INSTEAD OF GOING DIRECTLY TO SERVER

    this.db = new PouchDB('cloudo'); //Creates new pouchdb 

    this.remote = details.userDBs.supertest; //Take in the user data and then sync it with the cloud db server

    let options = {
      live: true, //Live is true
      retry: true,
      continuous: true
    };

    this.db.sync(this.remote, options); //Synce database with the cloudb database

    console.log(this.db);

  }
  fetch(){
    return this.db.allDocs({include_docs: true});
  }
  get(){
    return this.remote.allDocs({include_docs: true});
  }


  logout(){ //If logout 

    this.data = null;
     this.db.destroy().then(() => {
      console.log("database removed"); //Remove Database
  });
  }

 getEvents() { //Get events function

    if (this.data) { //If theres data 
      return Promise.resolve(this.data); //return this data
    }

    return new Promise(resolve => {

      this.db.allDocs({ //Include all docs

        include_docs: true

      }).then((result) => {
        var i = 5;

        this.data = [i];
        
        
          
         


        let docs = result.rows.map((row) => {
          this.data.push(row.doc); //Push data on to docs
          this.data.push(row.doc);
        });

        resolve(this.data);

        this.db.changes({live: true, since: 'now', include_docs: true}).on('change', (change) => {
          this.handleChange(change); //If changed, change the data
        });

      }).catch((error) => {

        console.log(error);

      }); 

    });

  }
      
  createEvent(event){
    this.db.post(event); //Post event to database
  }

  updateEvent(event){
    this.db.put(event).catch((err) => {
      console.log(err); 
    });
  }

  deleteEvent(event){
    this.db.remove(event).catch((err) => {
      console.log(err); //Remove event from database
    });
  }

  handleChange(change){

    let changedDoc = null;
    let changedIndex = null; //If changed doc equal to null

    this.data.forEach((doc, index) => { //For each changed

      if(doc._id === change.id){
        changedDoc = doc;
        changedIndex = index;
      }

    });

    //A document was deleted
    if(change.deleted){
      this.data.splice(changedIndex, 1);
    } 
    else {

      //A document was updated
      if(changedDoc){
        this.data[changedIndex] = change.doc;
      } 

      //A document was added
      else {
        this.data.push(change.doc); 
      }

    }

  }

}