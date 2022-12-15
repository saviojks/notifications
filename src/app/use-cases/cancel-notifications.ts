import { Injectable } from '@nestjs/common';
import { NotificationRepositories } from '../repositories/notification-repositories';
import { NotificationNotFound } from './errors/notification-not-found';

export interface ICancelNotification {
  notificationId: string;
}

type ICancelNotificationResponse = void;
@Injectable()
export class CancelNotification {
  constructor(private notificationRepository: NotificationRepositories) {}

  async execute({
    notificationId,
  }: ICancelNotification): Promise<ICancelNotificationResponse> {
    const notification = await this.notificationRepository.findById(
      notificationId,
    );
    if (!notification) {
      throw new NotificationNotFound();
    }
    notification.cancel();

    await this.notificationRepository.save(notification);
  }
}
