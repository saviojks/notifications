import { Injectable } from '@nestjs/common';
import { Notification } from '@app/entities/notifications';
import { NotificationRepositories } from '@app/repositories/notification-repositories';
import { PrismaService } from './prisma.service';
import { PrismaNotificationsMappers } from './mappers/primas-notification-mappers';

@Injectable()
export class PrismaNotificationsRepositories
  implements NotificationRepositories
{
  constructor(private prismaService: PrismaService) {}
  async create(notification: Notification): Promise<void> {
    const row = PrismaNotificationsMappers.toPrisma(notification);

    await this.prismaService.notifications.create({
      data: row,
    });
  }
}
