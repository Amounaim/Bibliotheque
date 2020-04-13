import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})

//Dans  AuthService , vous allez créer trois méthodes :
//une méthode permettant de créer un nouvel utilisateur ;
//une méthode permettant de connecter un utilisateur existant ;
//une méthode permettant la déconnexion de l'utilisateur.

export class AuthService {

  constructor() { }

  createNewUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );}
    );
  }

  signInUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );}
    );
  }
  
  signOutUser() {
    firebase.auth().signOut();
  }


}
