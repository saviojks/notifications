import { Content } from '@app/entities/content';
import { Notification } from '@app/entities/notifications';
import { Notifications as RowNotification } from '@prisma/client';

export class PrismaNotificationsMappers {
  static toPrisma(notification: Notification) {
    const {
      id,
      category,
      content,
      createdAt,
      recipientId,
      readAt,
      canceledAt,
    } = notification;
    return {
      id,
      category,
      content: content.value,
      createdAt,
      recipientId,
      readAt,
      canceledAt,
    };
  }
  static toDomain(ram: RowNotification): Notification {
    const {
      id,
      category,
      content,
      createdAt,
      recipientId,
      canceledAt,
      readAt,
    } = ram;
    return new Notification(
      {
        category,
        content: new Content(content),
        createdAt,
        recipientId,
        canceledAt,
        readAt,
      },
      id,
    );
  }
}
