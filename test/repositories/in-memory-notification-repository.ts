import { Notification } from '@app/entities/notifications';
import { NotificationRepositories } from '@app/repositories/notification-repositories';

export class InMemoryNotificationsRepository
  implements NotificationRepositories
{
  public notifications: Notification[] = [];

  async findById(notificationID: string): Promise<Notification> {
    const notification = this.notifications.find(
      (item) => item.id === notificationID,
    );
    if (!notification) {
      return null;
    }
    return notification;
  }
  async countManyByRecipientId(recipientId: string): Promise<number> {
    return this.notifications.filter(
      (notification) => notification.recipientId === recipientId,
    ).length;
  }

  async create(notification: Notification) {
    this.notifications.push(notification);
  }

  async save(notification: Notification): Promise<void> {
    const notificationIndex = this.notifications.findIndex(
      (item) => item.id === notification.id,
    );
    if (notificationIndex >= 0) {
      this.notifications[notificationIndex] = notification;
    }
  }
}
