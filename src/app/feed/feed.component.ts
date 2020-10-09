import { User } from './../models/user.model';
import { AngularFireList } from 'angularfire2/database';
import { Component, OnInit, OnChanges } from '@angular/core';
import { ChatMessage } from './../models/chat-message.model';
import { ChatService } from './../services/chat.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit, OnChanges {

  feed:Observable<any[]>;

  constructor(private chat: ChatService) { 
  }

  ngOnInit(): void {
    this.feed = this.chat.getMessages().valueChanges();
   
  }
  ngOnChanges(): void {
    this.feed = this.chat.getMessages().valueChanges();
  }

}
