import { User } from './../models/user.model';
import { ChatService } from '../services/chat.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {


  users: User[];

  constructor(chat: ChatService) {
    chat.getUsers().valueChanges().subscribe(users => {
      this.users = users;
 
    })
  }

}
;

