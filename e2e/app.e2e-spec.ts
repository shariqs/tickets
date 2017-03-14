import { EtesPage } from './app.po';

describe('etes App', () => {
  let page: EtesPage;

  beforeEach(() => {
    page = new EtesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
