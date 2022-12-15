import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notification-repository';
import { GetRecipientNotification } from '../get-recipient-notifications';

describe('Count recipient notification', () => {
  it('should be able to count recipient notification', async () => {
    const notificationsRepositories = new InMemoryNotificationsRepository();
    const getRecipientNotifications = new GetRecipientNotification(
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

    const { notifications } = await getRecipientNotifications.execute({
      recipientId: 'recipient-id-1',
    });

    expect(notifications).toHaveLength(3);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'recipient-id-1' }),
        expect.objectContaining({ recipientId: 'recipient-id-1' }),
      ]),
    );
  });
});
