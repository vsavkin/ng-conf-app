import 'rxjs/add/operator/map';

import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {Message} from '../../../model';
import {Store} from '@ngrx/store';

@Component({
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {
  messages: Observable<Message[]>;

  constructor(store: Store<any>) {
    this.messages = store.select('messages').map(m => m['filtered']);
  }
}
