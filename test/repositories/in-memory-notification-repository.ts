import { Notification } from '@app/entities/notifications';
import { NotificationRepositories } from '@app/repositories/notification-repositories';

export class InMemoryNotificationsRepository
  implements NotificationRepositories
{
  public notifications: Notification[] = [];
  async create(notification: Notification) {
    this.notifications.push(notification);
  }
}
