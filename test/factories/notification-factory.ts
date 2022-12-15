import { Content } from '@app/entities/content';
import { INotification, Notification } from '@app/entities/notifications';

type TOverride = Partial<INotification>;

export function makeNotification(override: TOverride = {}) {
  return new Notification({
    content: new Content(`você tem 2 notificações! `),
    category: 'Aviso',
    recipientId: 'recipient-id-1',
    ...override,
  });
}
