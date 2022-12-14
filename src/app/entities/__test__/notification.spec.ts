import { Content } from '../content';
import { Notification } from '../notifications';

describe('Notification content', () => {
  it('should be able to create a notification content', () => {
    const notification = new Notification({
      content: new Content('Uma nova notification'),
      category: 'MSN',
      recipientId: 'recipient-id-content',
    });
    expect(notification).toBeTruthy();
  });
});
