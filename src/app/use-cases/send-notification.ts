import { Notification } from './../entities/notifications';
import { Content } from '../entities/content';

export interface ISendNotification {
  recipientId: string;
  content: string;
  category: string;
}

interface ISendNotificationResponse {
  notification: Notification;
}

export class SendNotification {
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

    return { notification };
  }
}
