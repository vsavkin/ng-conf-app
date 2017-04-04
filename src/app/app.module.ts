import 'rxjs/add/operator/mergeMap';

import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {MaterialModule} from '@angular/material';
import {StoreModule} from '@ngrx/store';
import {RouterStoreModule} from '@ngrx/router-store';

import 'rxjs/add/operator/map';
import {AppComponent} from './app.component';
import {conversationsReducer, messagesReducer} from '../model';
import {ConversationsComponent} from './conversations/conversations.component';
import {ConversationComponent} from './conversation/conversation.component';
import {MessagesComponent} from './conversation/messages/messages.component';
import {MessageComponent} from './conversation/message/message.component';
import {ComposeComponent} from './compose/compose.component';


// clang-format off
const routes = [
  {path: '', pathMatch: 'full', redirectTo: '/inbox'},
  {
    path: ':folder',
    children: [
      {
        path: '',
        component: ConversationsComponent,
      },
      {
        path: ':id',
        component: ConversationComponent,
        children: [
          {
            path: '',
            component: MessagesComponent
          },
          {
            path: 'messages/:id',
            component: MessageComponent
          },
          {
            path: 'compose',
            component: ComposeComponent,
            outlet: 'popup'
          }
        ]
      }
    ]
  }
];
// clang-format on

@NgModule({
  declarations:
    [AppComponent, ConversationsComponent, ConversationComponent, MessagesComponent, MessageComponent, ComposeComponent],
  imports: [
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    BrowserModule,
    MaterialModule,
    StoreModule.provideStore({conversations: conversationsReducer, messages: messagesReducer}),
    RouterStoreModule.connectRouter()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
