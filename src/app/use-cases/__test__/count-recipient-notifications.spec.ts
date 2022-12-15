import { Content } from '@app/entities/content';
import { Notification } from '@app/entities/notifications';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notification-repository';
import { CountRecipientNotification } from '../count-recipient-notifications';

describe('Count recipient notification', () => {
  it('should be able to count recipient notification', async () => {
    const notificationsRepositories = new InMemoryNotificationsRepository();
    const CountRecipientNotifications = new CountRecipientNotification(
      notificationsRepositories,
    );

    for (let index = 0; index < 3; index++) {
      await notificationsRepositories.create(
        new Notification({
          content: new Content(`você tem ${index + 1} notificações `),
          category: 'Aviso',
          recipientId: 'recipient-id-1',
        }),
      );
    }
    await notificationsRepositories.create(
      new Notification({
        content: new Content(`você tem 1 notificação `),
        category: 'Aviso',
        recipientId: 'fake-recipient-id',
      }),
    );

    const { count } = await CountRecipientNotifications.execute({
      recipientId: 'recipient-id-1',
    });

    expect(count).toBe(3);
  });
});
