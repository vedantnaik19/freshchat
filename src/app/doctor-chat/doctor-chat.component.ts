import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-doctor-chat',
  templateUrl: './doctor-chat.component.html',
  styleUrls: ['./doctor-chat.component.scss']
})
export class DoctorChatComponent implements OnInit {

  messages: any = [];

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.chatService.retrieveConversation().subscribe(data => {
      this.messages = data.messages;
  });}

}
