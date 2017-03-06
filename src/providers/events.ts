import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';

@Injectable()
export class Events {

  data: any;
  db: any;
  remote: any;

  constructor() {

  }

  init(details){

    this.db = new PouchDB('cloudo');

    this.remote = details.userDBs.supertest;

    let options = {
      live: true,
      retry: true,
      continuous: true
    };

    this.db.sync(this.remote, options);

    console.log(this.db);

  }
  fetch(){
    return this.db.allDocs({include_docs: true});
  }
  get(){
    return this.remote.allDocs({include_docs: true});
  }


  logout(){

    this.data = null;
     this.db.destroy().then(() => {
      console.log("database removed");
  });
  }

 getEvents() {

    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {

      this.db.allDocs({

        include_docs: true

      }).then((result) => {

        this.data = [];
         for(let i = 0; i<= result.rows.length; i++) { this.data.push(result.rows[i].doc);  {
    }};
        

        let docs = result.rows.map((row) => {
          this.data.push(row.doc);
        });

        resolve(this.data);

        this.db.changes({live: true, since: 'now', include_docs: true}).on('change', (change) => {
          this.handleChange(change);
        });

      }).catch((error) => {

        console.log(error);

      }); 

    });

  }
      
  createEvent(event){
    this.db.post(event);
  }

  updateEvent(event){
    this.db.put(event).catch((err) => {
      console.log(err);
    });
  }

  deleteEvent(event){
    this.db.remove(event).catch((err) => {
      console.log(err);
    });
  }

  handleChange(change){

    let changedDoc = null;
    let changedIndex = null;

    this.data.forEach((doc, index) => {

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