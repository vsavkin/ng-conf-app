import 'rxjs/add/operator/map';

import { Component, ChangeDetectionStrategy } from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {Message} from '../../../model';
import {Store} from '@ngrx/store';

@Component({
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageComponent {
  message: Observable<Message>;
  messages: Observable<Message[]>;

  constructor(store: Store<any>) {
    this.messages = store.select('messages').map(m => m['filtered']);
    this.message = store.select('messages').map(m => m['message']);
  }
}
