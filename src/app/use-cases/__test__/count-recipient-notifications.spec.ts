import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notification-repository';
import { CountRecipientNotifications } from '../count-recipient-notifications';

describe('Count recipient notification', () => {
  it('should be able to count recipient notification', async () => {
    const notificationsRepositories = new InMemoryNotificationsRepository();
    const countRecipientNotifications = new CountRecipientNotifications(
      notificationsRepositories,
    );

    for (let index = 0; index < 3; index++) {
      await notificationsRepositories.create(
        makeNotification({ recipientId: 'recipient-id-1' }),
      );
    }
    await notificationsRepositories.create(
      makeNotification({ recipientId: 'recipient-id-2' }),
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId: 'recipient-id-1',
    });

    expect(count).toBe(3);
  });
});
