import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(private angularFireAuth:AngularFireAuth,
    private router:Router,
    private toastController: ToastController){
    
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

  getUser(): Promise<firebase.User> {
    return this.angularFireAuth.authState.pipe(first()).toPromise();
  }

  signUp(email:string, password:string){
    this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(user =>{
        this.presentToast('user created', 'success')
        this.router.navigate(['/home']);
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
