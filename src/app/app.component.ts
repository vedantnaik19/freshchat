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
export class AppComponent {
  

  title = 'chat-test';
}
