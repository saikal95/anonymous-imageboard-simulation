import { Injectable } from '@angular/core';
import {Message, messageData} from "./message.model";
import {map, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messages: Message[] | null | undefined;


  constructor(private http: HttpClient) { }

  getMessages() {
    return this.http.get<{ [id: string]: Message }>(environment.apiUrl + '/messages').pipe(map(response => {
      if (response === null) {
        return [];
      }
      return Object.keys(response).map(id => {
        const message = response[id];
        return new Message(message._id, message.message, message.author, message.datetime);
      })
    }))
  }

  postMessage(message: messageData) {
    return this.http.post(environment.apiUrl +'/messages', message);
  }

}
