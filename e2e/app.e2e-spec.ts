import { MailPage } from './app.po';

describe('mail App', () => {
  let page: MailPage;

  beforeEach(() => {
    page = new MailPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
