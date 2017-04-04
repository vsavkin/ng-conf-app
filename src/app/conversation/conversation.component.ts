import 'rxjs/add/operator/map';

import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';

import {Conversation} from '../../model';
import {Store} from '@ngrx/store';

@Component({
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent {
  conversation: Observable<Conversation>;

  constructor(private router: Router, private store: Store<any>) {
    this.conversation = store.select('conversations').map(s => s['conversation']);
  }

  goUp(): void {
    this.router.navigate(['../']);
  }
}
