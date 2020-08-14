import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { first } from 'rxjs/operators';

import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userCollection: AngularFirestoreCollection;
  userDocument: AngularFirestoreDocument<User>;

  constructor(private angularFireAuth:AngularFireAuth,
    private db: AngularFirestore,
    private router:Router,
    private toastController: ToastController)
  {
    this.userCollection = db.collection('users');
  }

  async presentToast(message:string, color:string){
    const toast = await this.toastController.create({
      message,
      color,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

  isAuth(): Promise<firebase.User> {
    return this.angularFireAuth.authState.pipe(first()).toPromise();
  }

  signUp(newUser:User, password:string){
    this.angularFireAuth.auth.createUserWithEmailAndPassword(newUser.email, password)
      .then(user =>{
        this.userCollection.add(newUser)
          .then(user =>{
            this.router.navigate(['/home']);
            this.presentToast('user created', 'success')
          })
          .catch(error =>{
            this.presentToast('user doc not created', 'danger')
          })
      })
      .catch(error =>{
        this.presentToast(error.message, 'danger')
      })
  }

  login(email:string, password:string){
    this.angularFireAuth.auth.signInWithEmailAndPassword(email, password)
      .then(user =>{
        this.router.navigate(['/home']);
      })
      .catch(error =>{
        this.presentToast(error.message, 'danger')
      })
  }

  logout(){
    this.angularFireAuth.auth.signOut();
    this.router.navigate(['/login']);
  }
}
