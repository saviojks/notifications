import { Notification } from '@app/entities/notifications';

export class PrismaNotificationsMappers {
  static toPrisma(notification: Notification) {
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
