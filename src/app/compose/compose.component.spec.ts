import {ComposeComponent} from './compose.component';

/**
 * This is an example of an isolate test. There is nothing router-specific here.
 * We instantiate a component, without rendereing its template, and exercises it direclty.
 */
describe('ComposeComponent', () => {
  it('submits an action', () => {
    const store = jasmine.createSpyObj('store', ['dispatch']);
    const router = jasmine.createSpyObj('router', ['navigate']);
    const route = <any>jasmine.createSpy('route');

    const c = new ComposeComponent(store, router, route);
    c.form.setValue({title: 'actualTitle', body: 'actualBody'});
    c.onSubmit();

    expect(store.dispatch).toHaveBeenCalledWith({type: 'reply', payload: {title: 'actualTitle', body: 'actualBody'}});
  });
});
