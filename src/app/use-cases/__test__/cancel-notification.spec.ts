import { NotificationNotFound } from './../errors/notification-not-found';
import { Content } from '@app/entities/content';
import { Notification } from '@app/entities/notifications';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notification-repository';
import { CancelNotification } from '../cancel-notifications';

describe('Cancel notification', () => {
  it('should be able to cancel notification', async () => {
    const notificationsRepositories = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(
      notificationsRepositories,
    );

    const notification = new Notification({
      content: new Content('Uma nova notificação'),
      category: 'Aviso',
      recipientId: 'exemple-recipient-id',
    });

    await notificationsRepositories.create(notification);
    await cancelNotification.execute({ notificationId: notification.id });

    expect(notificationsRepositories.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to cancel a non existing notification ', async () => {
    const notificationsRepositories = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(
      notificationsRepositories,
    );
    expect(() => {
      return cancelNotification.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
