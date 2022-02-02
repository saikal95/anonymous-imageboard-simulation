import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {messageData} from "../shared/message.model";
import {MessageService} from "../shared/message.service";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass']
})
export class FormComponent implements OnInit {

@ViewChild('f')messageForm! : NgForm;

  constructor( private messageService: MessageService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const messageData : messageData  = {
      author: this.messageForm.value.author,
      message: this.messageForm.value.message
    };
    console.log(messageData);
    this.messageService.postMessage(messageData).subscribe( {
      next: this.messageService.getMessages,
      error: err => {
        console.log('Something went wrong!');
      }
    });
  }
}
