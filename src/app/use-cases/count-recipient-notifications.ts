import { Injectable } from '@nestjs/common';
import { NotificationRepositories } from '../repositories/notification-repositories';

export interface ICountRecipientNotification {
  recipientId: string;
}

interface ICountRecipientNotificationResponse {
  count: number;
}
@Injectable()
export class CountRecipientNotifications {
  constructor(private notificationRepository: NotificationRepositories) {}

  async execute({
    recipientId,
  }: ICountRecipientNotification): Promise<ICountRecipientNotificationResponse> {
    const count = await this.notificationRepository.countManyByRecipientId(
      recipientId,
    );
    return { count };
  }
}
