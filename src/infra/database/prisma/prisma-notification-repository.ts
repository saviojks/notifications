import { Injectable } from '@nestjs/common';
import { Notification } from '@app/entities/notifications';
import { NotificationRepositories } from '@app/repositories/notification-repositories';
import { PrismaService } from './prisma.service';

@Injectable()
export class PrismaNotificationsRepositories
  implements NotificationRepositories
{
  constructor(private prismaService: PrismaService) {}
  async create(notification: Notification): Promise<void> {
    const { id, category, content, createdAt, recipientId, readAt } =
      notification;
    await this.prismaService.notifications.create({
      data: {
        id,
        category,
        content: content.value,
        createdAt,
        recipientId,
        readAt,
      },
    });
  }
}
