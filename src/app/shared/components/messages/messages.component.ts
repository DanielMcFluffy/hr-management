import { Component } from '@angular/core';
import { MessageService } from './message.service';
import { AsyncPipe, CommonModule} from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'messages',
  standalone: true,
  imports: [AsyncPipe, CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})
export class MessagesComponent {

  //messageService would be available in this component only if it is provided in the parent component
  constructor(
    public messageService: MessageService 
  ) {}

}
