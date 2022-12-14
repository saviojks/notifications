import { Notification } from '../../src/app/entities/notifications';
import { NotificationRepositories } from '../../src/app/repositories/notification-repositories';

export class InMemoryNotificationsRepository
  implements NotificationRepositories
{
  public notifications: Notification[] = [];
  async create(notification: Notification) {
    this.notifications.push(notification);
  }
}
