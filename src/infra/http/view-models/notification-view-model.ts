import { Notification } from '@app/entities/notifications';
export class NotificationViewModel {
  static toHttp(notification: Notification) {
    const { id, category, content, createdAt, recipientId, readAt } =
      notification;
    return {
      id,
      category,
      content: content.value,
      createdAt,
      recipientId,
      readAt,
    };
  }
}
