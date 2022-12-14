import { Module } from '@nestjs/common';
import { NotificationRepositories } from 'src/app/repositories/notification-repositories';
import { PrismaNotificationsRepositories } from './prisma/prisma-notification-repository';
import { PrismaService } from './prisma/prisma.service';

@Module({
  providers: [
    PrismaService,
    {
      provide: NotificationRepositories,
      useClass: PrismaNotificationsRepositories,
    },
  ],
  exports: [NotificationRepositories],
})
export class DatabaseModule {}
