import { Injectable } from '@nestjs/common';
import { NotificationRepositories } from '../repositories/notification-repositories';
import { NotificationNotFound } from './errors/notification-not-found';

export interface IReadNotification {
  notificationId: string;
}

type IReadNotificationResponse = void;
@Injectable()
export class ReadNotification {
  constructor(private notificationRepository: NotificationRepositories) {}

  async execute({
    notificationId,
  }: IReadNotification): Promise<IReadNotificationResponse> {
    const notification = await this.notificationRepository.findById(
      notificationId,
    );
    if (!notification) {
      throw new NotificationNotFound();
    }
    notification.read();

    await this.notificationRepository.save(notification);
  }
}
