import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/zip';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/map';
import {routerActions} from '@ngrx/router-store';

/**
 * Data
 */
export type User = {
  id: number; name: string; email: string;
};

export type Conversation = {
  id: number, title: string, user: User; folder: string
};

export type Message = {
  id: number; conversationId: number; title: string; body: string; user: User;
};

export type AppState = {
  conversations: Conversation[]; messages: Message[];
};

export type Reply = {
  type: 'reply'; conversationId: number; payload: {title: string; body: string; };
  onSuccess: Function;
};

export type Action = Reply;



const users =  [
  {id: 0, name: 'Victor', email: 'victor@example.com'},
  {id: 1, name: 'Jeff', email: 'jeff@example.com'},
  {id: 2, name: 'Someone Else', email: 'someoneelse@example.com'}
];

const initConversations = [
  {id: 0, user: users[0], title: 'The Myth of Sisyphus', folder: 'inbox'},
  {id: 1, user: users[1], title: 'The Nicomachean Ethics', folder: 'inbox'},
  {id: 2, user: users[0], title: 'A Fraft Conversation', folder: 'drafts'}
];

const initMessages = [
  {
    id: 0,
    conversationId: 0,
    title: 'The Path of the Absurd Man',
    body:
      'The absurd man embraces the principles of revolt, freedom, and passion. What does it mean by freedom?',
    user: users[0]
  },
  {
    id: 1,
    conversationId: 0,
    title: 'Re: The Path of the Absurd Man',
    body: 'He means leaving without the appeal.',
    user: users[1]
  },
  {
    id: 2,
    conversationId: 1,
    title: 'Virtue as the Mean',
    body: 'Does he mean it is not a goal or that it is intermediate?',
    user: users[0]
  },
  {
    id: 3,
    conversationId: 1,
    title: 'Re: Virtue as the Mean',
    body: 'He means it as "intermediate", a virtue lies between excess and defect',
    user: users[2]
  },
  {
    id: 4,
    conversationId: 2,
    title: 'Draft Message',
    body: 'Draft Message Body',
    user: users[0]
  }
];

function extractFolder(action: any): string {
  return action.payload.path.split('/')[1];
}

function extractConversationId(action: any): number {
  const s = action.payload.path.split('(');
  return +s[0].split('/')[2];
}

function extractMessageId(action: any): number {
  const p = action.payload.path;
  const s = p.indexOf('messages/');
  const e = p.indexOf('/', s + 9);
  return e === -1 ? +p.substring(s + 9) : +p.substring(s + 9, e);
}

export function conversationsReducer({conversations, filtered, folder, conversation} =
                                       {conversations: initConversations, filtered: [], folder: '', conversation: null}, action: any) {
  if (action.type === routerActions.UPDATE_LOCATION) {
    const newFolder = extractFolder(action);
    const newFiltered = conversations.filter(c => c.folder === newFolder);

    const id = extractConversationId(action);
    const matchedId = conversations.filter(c => c.id === id);

    return {conversations, filtered: newFiltered, folder: newFolder, conversation: matchedId.length > 0 ? matchedId[0] : null};
  } else {
    return {conversations, filtered, folder, conversation};
  }
}

export function messagesReducer({messages, filtered, conversationId, message} =
                                  {messages: initMessages, filtered: [], conversationId: -1, message: null}, action: any) {
  if (action.type === routerActions.UPDATE_LOCATION) {
    const id = extractConversationId(action);
    const messageId = extractMessageId(action);
    const newFiltered = messages.filter(c => c.conversationId === id );
    const newMessage = messages.filter(c => c.id === messageId)[0];
    return {messages, filtered: newFiltered, conversationId: id, message: newMessage};

  } else if (action.type === 'reply') {
    const newMessage = {
      id: Math.floor(Math.random() * 100000),
      conversationId,
      title: action.payload.title,
      body: action.payload.body,
      user: users[0]
    };

    console.log(newMessage);

    const newMessages = [...messages, newMessage];
    const newFiltered = newMessages.filter(c => c.conversationId === conversationId);
    return {messages: newMessages, filtered: newFiltered, conversationId, message: undefined};

  } else {
    return {messages, filtered, conversationId, message};
  }
}
