import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit {

  @ViewChild('scroller') private feedContainer: ElementRef;

  constructor() { }

  ngOnInit() { 
    this.scrollToBottom();
  }

  ngAfterViewChecked() {        
    this.scrollToBottom();        
} 

  scrollToBottom(): void {
    try {
        this.feedContainer.nativeElement.scrollTop = this.feedContainer.nativeElement.scrollHeight;
    } catch(err) { }                 
}


}