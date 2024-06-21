import { Component } from '@angular/core';
import { MessageService } from './message.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'messages',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})
export class MessagesComponent {
  
  constructor(
    public messageService: MessageService
  ) {}

}
