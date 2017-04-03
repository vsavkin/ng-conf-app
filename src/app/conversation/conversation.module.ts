import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MessagesComponent } from "app/conversation/messages/messages.component";
import { ConversationComponent } from "app/conversation/conversation.component";
import { MessageComponent } from "app/conversation/message/message.component";
import { RouterModule } from "@angular/router";
import { ComposeComponent } from "app/compose/compose.component";
import { MdCardModule, MdInputModule, MdButtonModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MdCardModule,
    MdInputModule,
    MdButtonModule,
    RouterModule.forChild([
      {
        path: '',
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
    ])
  ],
  declarations: [
    ComposeComponent,
    ConversationComponent,
    MessageComponent,
    MessagesComponent
  ]
})
export class ConversationModule {}
