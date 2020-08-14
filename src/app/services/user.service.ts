import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(private AngularFireAuth:AngularFireAuth,
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

  isAuth(){
    // To do
    return true;
  }

  signUp(email:string, password:string){
    this.AngularFireAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(user =>{
        this.presentToast('user created', 'success')
        this.router.navigate(['/home']);
      })
      .catch(error =>{
        this.presentToast(error.message, 'danger')
      })
  }

  login(email:string, password:string){
    this.AngularFireAuth.auth.signInWithEmailAndPassword(email, password)
      .then(user =>{
        this.router.navigate(['/home']);
      })
      .catch(error =>{
        this.presentToast(error.message, 'danger')
      })
  }

  logout(){
    this.AngularFireAuth.auth.signOut();
    this.router.navigate(['/login']);
  }
}
