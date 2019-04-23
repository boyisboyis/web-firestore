import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  public db: firebase.firestore.Firestore;

  constructor() {
    const config = {
      apiKey: 'AIzaSyChIdvAPv_juiC3tHGCKl5AL80Ezs0axog',
      authDomain: 'aaaaa-a36c3.firebaseapp.com',
      databaseURL: 'https://aaaaa-a36c3.firebaseio.com',
      projectId: 'aaaaa-a36c3',
      storageBucket: 'aaaaa-a36c3.appspot.com',
      messagingSenderId: '820646795041'
    };
    firebase.initializeApp(config);

    this.db = firebase.firestore();
  }
}
