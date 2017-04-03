import 'rxjs/add/operator/mergeMap';

import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import { RouterModule, PreloadAllModules } from '@angular/router';
import {MdCardModule} from '@angular/material';
import {StoreModule} from '@ngrx/store';
import {RouterStoreModule} from '@ngrx/router-store';

import 'rxjs/add/operator/map';
import {AppComponent} from './app.component';
import {conversationsReducer, messagesReducer} from '../model';
import {ConversationsComponent} from './conversations/conversations.component';


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
        loadChildren: 'app/conversation/conversation.module#ConversationModule'
      }
    ]
  }
];
// clang-format on

@NgModule({
  declarations:
    [AppComponent, ConversationsComponent],
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules}),
    ReactiveFormsModule,
    BrowserModule,
    StoreModule.provideStore({conversations: conversationsReducer, messages: messagesReducer}),
    RouterStoreModule.connectRouter(),
    MdCardModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
