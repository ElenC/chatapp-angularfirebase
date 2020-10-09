
import { Component, OnInit, Input } from '@angular/core';
import { ChatMessage } from './../models/chat-message.model';
import { AuthService } from './../services/auth.service';
import { ChatService } from './../services/chat.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @Input() chatMessage: ChatMessage;
  userEmail: string;
  userName: string;
  messageContent: string;
  timestamp: Date = new Date();
  isOwnMessage: boolean;
  ownEmail: string;

  constructor(private authService: AuthService) {
    authService.authUser().subscribe(user =>{
      this.ownEmail = user.email;
      this.isOwnMessage = this.ownEmail === this.userEmail;
    })
   }

  ngOnInit(): void {
    this.messageContent = this.chatMessage.message;
    this.timestamp = this.chatMessage.timeSent;
    this.userEmail = this.chatMessage.email;
    this.userName = this.chatMessage.userName;
    console.log(this.userName)
  }

}
