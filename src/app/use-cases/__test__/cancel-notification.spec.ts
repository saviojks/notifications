import { NotificationNotFound } from './../errors/notification-not-found';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notification-repository';
import { CancelNotification } from '../cancel-notifications';
import { makeNotification } from '@test/factories/notification-factory';

describe('Cancel notification', () => {
  it('should be able to cancel notification', async () => {
    const notificationsRepositories = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(
      notificationsRepositories,
    );

    const notification = makeNotification();

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
