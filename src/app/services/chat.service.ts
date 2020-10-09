import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

import {AngularFireDatabase }from 'angularfire2/database'
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app'
import { ChatMessage } from './../models/chat-message.model' 
import {AngularFireList} from 'angularfire2/database'


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  chatMessages: AngularFireList<any>;
  chatMessage: ChatMessage;
  userName: Observable<any>;
  user: firebase.User;
  message: Observable<string>;
  


  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth, private router: Router) {
    this.afAuth.authState.subscribe(auth =>{
        if(auth !== undefined && auth !== null ){
          this.user = auth;
          console.log(auth)
        }
        this.getUser().snapshotChanges().subscribe((a: any)  => this.userName = a.displayName)
      })
   }

   getUser(){
    let userId = this.user.uid
     const path= `/users/${userId}`
     return this.db.object(path);
   }

   getUsers(){
     const path = '/users';
     return this.db.list(path);
   }
   
  sendMessage(msg: string){
    const timestamp = this.getTimeStamp();
    const email = this.user.email;
    const userName = this.user.email;
    this.chatMessages = this.getMessages();
    this.chatMessages.push({
      message: msg,
      timeSent: timestamp,
      userName: userName,
      email: email
    })
    console.log(this.user)
  }

  getTimeStamp(){
    const now = new Date();
    const date = now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + now.getDate();
    const time = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
  
    return (date + ' ' + time);
  }

  getMessages():AngularFireList<ChatMessage>{
    return this.db.list('messages', ref => {
      return ref.limitToLast(25).orderByKey()
    } 
    )
  }

 
}
