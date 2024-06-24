import { Component } from '@angular/core';
import { MessageService } from './message.service';
import { AsyncPipe, CommonModule} from '@angular/common';

@Component({
  selector: 'messages',
  standalone: true,
  imports: [AsyncPipe, CommonModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})
export class MessagesComponent {

  //messageService would be available in this component only if it is provided in the parent component
  constructor(
    public messageService: MessageService 
  ) {}

}
