import { Injectable } from '@nestjs/common';
import { Notification } from '../entities/notifications';
import { Content } from '../entities/content';
import { NotificationRepositories } from '../repositories/notification-repositories';

export interface ISendNotification {
  recipientId: string;
  content: string;
  category: string;
}

interface ISendNotificationResponse {
  notification: Notification;
}
@Injectable()
export class SendNotification {
  constructor(private notificationRepository: NotificationRepositories) {}

  async execute({
    recipientId,
    content,
    category,
  }: ISendNotification): Promise<ISendNotificationResponse> {
    const notification = new Notification({
      recipientId,
      category,
      content: new Content(content),
    });

    await this.notificationRepository.create(notification);
    return { notification };
  }
}
