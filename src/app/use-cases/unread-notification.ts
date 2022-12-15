import { Injectable } from '@nestjs/common';
import { NotificationRepositories } from '../repositories/notification-repositories';
import { NotificationNotFound } from './errors/notification-not-found';

export interface IUnreadNotification {
  notificationId: string;
}

type IUnreadNotificationResponse = void;
@Injectable()
export class UnreadNotification {
  constructor(private notificationRepository: NotificationRepositories) {}

  async execute({
    notificationId,
  }: IUnreadNotification): Promise<IUnreadNotificationResponse> {
    const notification = await this.notificationRepository.findById(
      notificationId,
    );
    if (!notification) {
      throw new NotificationNotFound();
    }
    notification.unread();

    await this.notificationRepository.save(notification);
  }
}
