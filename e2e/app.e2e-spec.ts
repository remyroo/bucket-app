import { BucketAppPage } from './app.po';

describe('bucket-app App', function() {
  let page: BucketAppPage;

  beforeEach(() => {
    page = new BucketAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
