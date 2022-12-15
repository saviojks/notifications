import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notification-repository';
import { SendNotification } from '../send-notifications';

describe('send notification', () => {
  it('should be able to send notification', async () => {
    const notificationsRepositories = new InMemoryNotificationsRepository();
    const sendNotification = new SendNotification(notificationsRepositories);

    const { notification } = await sendNotification.execute({
      content: 'Uma nova notificação',
      category: 'Aviso',
      recipientId: 'exemple-recipient-id',
    });

    expect(notification).toBeTruthy();
    expect(notificationsRepositories.notifications).toHaveLength(1);
    expect(notificationsRepositories.notifications[0]).toEqual(notification);
  });
});
