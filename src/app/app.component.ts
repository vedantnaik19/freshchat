import { Component, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AppService } from './app.service';
import { NgxFreshBotService } from './ngx-fresh-bot.service';
import { NgxFreshChatService } from './ngx-fresh-chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private chat: NgxFreshChatService, private bot:NgxFreshBotService, private service: AppService) { }

  ngOnInit(){
    this.chat.init({
      token: "2a67bace-6de3-4cd7-87a7-2761ec9adf1e",
      host: "https://wchat.in.freshchat.com",
      firstName: 'Ashish',
      lastName: 'Sandey',
      email: 'ashishsandey5@gmail.com',
      externalId: '1',
      restoreId: '14874709-6adc-4309-97e9-5d36317b11f6'
    }).pipe(
      switchMap(()=>this.chat.onUserCreate())
    ).subscribe(
      (user) => {
        console.log('Freshchat Started');
        console.log(user);
        
      }
    )
  }

  // ngOnInit() {
    
  //   this.bot.init({
  //     firstName: 'Ashish',
  //     lastName: 'Sandey',
  //     externalId: '1',
  //     email: 'ashishsandey5@gmail.com',
  //     phone: '9893355357',
  //     restoreId: '9a22a7e7-dd23-4ccb-b39c-5ede65d5f1de',
  //     customFunctions: {
  //       printFcn: this.printFcn
  //     }
  //   })
  //   .pipe(
        
  //     ).subscribe(
  //       (user) => {
  //         console.log('Freshchat Started');
  //         console.log(user);
          
  //       }
  //     )
  // }

  printFcn(){
    return {'a': "xyz"}
  }

  title = 'chat-test';
}
