import 'rxjs/add/operator/mergeAll';

import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {Message} from '../../../model';
import {Store} from '@ngrx/store';

@Component({
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {
  message: Observable<Message>;
  messages: Observable<Message[]>;

  constructor(store: Store<any>) {
    this.messages = store.select('messages').map(m => m['filtered']);
    this.message = store.select('messages').map(m => m['message']);
  }
}
