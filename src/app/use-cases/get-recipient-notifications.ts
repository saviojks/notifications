import { Notification } from '@app/entities/notifications';
import { Injectable } from '@nestjs/common';
import { NotificationRepositories } from '../repositories/notification-repositories';

export interface IGetRecipientNotification {
  recipientId: string;
}

interface IGetRecipientNotificationResponse {
  notifications: Notification[];
}
@Injectable()
export class GetRecipientNotifications {
  constructor(private notificationRepository: NotificationRepositories) {}

  async execute({
    recipientId,
  }: IGetRecipientNotification): Promise<IGetRecipientNotificationResponse> {
    const notifications =
      await this.notificationRepository.findManyByRecipientId(recipientId);
    return { notifications };
  }
}
