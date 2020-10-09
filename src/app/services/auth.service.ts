import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: Observable<firebase.User>
  private authState: any;
  private userId: string;

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase, private router: Router) {
    this.user = afAuth.authState;
   }
   authUser(){
     return this.user ;
   }
  get currentUserId(): string{
    return this.authState.user.uid;
  }

  login(email: string, password: string): Promise<void>{
     return this.afAuth.auth.signInWithEmailAndPassword(email, password)
     .then((resolve) =>{
       this.authState = resolve;
       const status = 'online';
       this.setUserStatus(status)
      
     })
   }

   logout(){
     this.afAuth.auth.signOut();
     this.router.navigate(['login']);
   }

   signUp(email:string, password:string, displayName:any){
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    .then((user) =>{
      this.authState = user;
      const status = 'online'
      this.setUserData(email, displayName, status);
    }).catch(error => console.log(error));
   }

   setUserData(email:string, displayName:any, status: string): void{
     const path = `users/${this.currentUserId}`;
    
     const data = {
       email: email,
       displayName: displayName,
       status: status,
       user1: displayName
     }
     console.log(displayName)
     this.db.object(path).update(data)
     .catch(error => console.log(error))
   }

   setUserStatus(status: string): void{
    const path = `users/${this.currentUserId}`
    const data ={
      status: status
    }
    this.db.object(path).update(data)
    .catch(error => console.log(error));
   }

   getUserId(): string{
     return this.userId;
   }
  
}
