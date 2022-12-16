import { Injectable } from '@nestjs/common';
import { Notification } from '@app/entities/notifications';
import { NotificationRepositories } from '@app/repositories/notification-repositories';
import { PrismaService } from './prisma.service';
import { PrismaNotificationsMappers } from './mappers/primas-notification-mappers';

@Injectable()
export class PrismaNotificationsRepositories
  implements NotificationRepositories
{
  constructor(private prisma: PrismaService) {}
  async findById(notificationID: string): Promise<Notification> {
    const notification = await this.prisma.notifications.findUnique({
      where: {
        id: notificationID,
      },
    });
    if (!notification) {
      return null;
    }
    return PrismaNotificationsMappers.toDomain(notification);
  }
  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    const notifications = await this.prisma.notifications.findMany({
      where: { recipientId: recipientId },
    });

    return notifications.map(PrismaNotificationsMappers.toDomain);
  }
  async countManyByRecipientId(recipientId: string): Promise<number> {
    const count = await this.prisma.notifications.count({
      where: {
        recipientId: recipientId,
      },
    });
    return count;
  }
  async create(notification: Notification): Promise<void> {
    const raw = PrismaNotificationsMappers.toPrisma(notification);

    await this.prisma.notifications.create({
      data: raw,
    });
  }
  async save(notification: Notification): Promise<void> {
    const raw = PrismaNotificationsMappers.toPrisma(notification);

    await this.prisma.notifications.update({
      where: {
        id: raw.id,
      },
      data: raw,
    });
  }
}
