import { Injectable } from '@nestjs/common';
import { Notification } from '../entities/notifications';
import { Content } from '../entities/content';
import { NotificationRepositories } from '../repositories/notification-repositories';

export interface ICountNotification {
  recipientId: string;
  content: string;
  category: string;
}

interface ICountNotificationResponse {
  notification: Notification;
}
@Injectable()
export class CountNotification {
  constructor(private notificationRepository: NotificationRepositories) {}

  async execute({
    recipientId,
    content,
    category,
  }: ICountNotification): Promise<ICountNotificationResponse> {
    const notification = new Notification({
      recipientId,
      category,
      content: new Content(content),
    });

    await this.notificationRepository.create(notification);
    return { notification };
  }
}
