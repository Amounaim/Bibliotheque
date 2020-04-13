import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bibliotheque';

  constructor(){
    const config = {
      apiKey: 'AIzaSyBpLJFKo6iZPdi0NwM1VCgt3xCzykSgGds',
      authDomain: 'bibliotheque-398f2.firebaseio.com',
      databaseURL: 'https://bibliotheque-398f2.firebaseio.com',
      projectId: 'bibliotheque-398f2',
      storageBucket: 'bibliotheque-398f2.appspot.com',
      messagingSenderId: '24016800975'
    };
    firebase.initializeApp(config);
  }

}
