import { AuthService } from './../services/auth.service';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app'
import {Router} from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: Observable<firebase.User>
  userEmail: any;
  userNickname: any
  
  constructor(private authService: AuthService) {

   }

  ngOnInit(): void {
    this.user = this.authService.authUser();
    this.user.subscribe(user =>{
      this.userEmail = user.email
    })
  }

  logout(){
    this.authService.logout();
  }


}
