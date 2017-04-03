import 'rxjs/add/operator/map';

import { Component, ChangeDetectionStrategy } from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {Conversation} from '../../model';
import {Store} from '@ngrx/store';

@Component({
  templateUrl: './conversations.component.html',
  styleUrls: ['./conversations.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConversationsComponent {
  folder: Observable<string>;
  conversations: Observable<Conversation[]>;

  constructor(store: Store<any>) {
    this.folder = store.select('conversations').map(c => c['folder']);
    this.conversations = store.select('conversations').map(c => c['filtered']);
  }
}
