import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/mergeAll';
import 'rxjs/add/operator/map';

import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {Conversation} from '../../model';
import {Store} from '@ngrx/store';

@Component({
  templateUrl: './conversations.component.html',
  styleUrls: ['./conversations.component.css']
})
export class ConversationsComponent {
  folder: Observable<string>;
  conversations: Observable<Conversation[]>;

  constructor(store: Store<any>) {
    this.folder = store.select('conversations').map(c => c['folder']);
    this.conversations = store.select('conversations').map(c => c['filtered']);
  }
}
