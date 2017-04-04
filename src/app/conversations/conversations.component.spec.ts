import {async, fakeAsync, TestBed} from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {addMatchers, advance} from '../../spec_utils';
import {ConversationsComponent} from './conversations.component';
import {of} from 'rxjs/observable/of';
import {Store} from '@ngrx/store';

/**
 * This is an example of a "shallow" test.
 * We render a component without rendering any of its children.
 *
 * TODO: remove AllowAllElementSchemaRegistry
 */
describe('ConversationsComponent', () => {
  let store: any = null;

  beforeEach(async(() => {
    addMatchers();

    store = jasmine.createSpyObj('store', ['select']);

    TestBed.configureTestingModule({
      declarations: [ConversationsComponent],
      providers: [
        { provide: Store, useValue: store}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    TestBed.compileComponents();
  }));

  it('renders a list of conversations', fakeAsync(() => {
    store.select.and.returnValue(of({
      folder: 'inbox',
      filtered: [
        { id: 1, title: 'Title1', user: {name: 'Victor', email: 'victor@example.com'} },
        { id: 2, title: 'Title2', user: {name: 'Jeff', email: 'jeff@example.com'} }
      ]
    }));

    const f = TestBed.createComponent(ConversationsComponent);
    advance(f);

    expect(f.debugElement.nativeElement).toHaveText('Title1');
    expect(f.debugElement.nativeElement).toHaveText('Title2');
  }));
});
