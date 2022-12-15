import { NotificationNotFound } from './../errors/notification-not-found';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notification-repository';
import { UnreadNotification } from '../unread-notification';
import { makeNotification } from '@test/factories/notification-factory';

describe('Unread notification', () => {
  it('should be able to unread notification', async () => {
    const notificationsRepositories = new InMemoryNotificationsRepository();
    const unreadNotification = new UnreadNotification(
      notificationsRepositories,
    );

    const notification = makeNotification({
      readAt: new Date(),
    });

    await notificationsRepositories.create(notification);
    await unreadNotification.execute({ notificationId: notification.id });

    expect(notificationsRepositories.notifications[0].readAt).toBeNull();
  });

  it('should not be able to unread a non existing notification ', async () => {
    const notificationsRepositories = new InMemoryNotificationsRepository();
    const unreadNotification = new UnreadNotification(
      notificationsRepositories,
    );
    expect(() => {
      return unreadNotification.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
