import { Notification } from '../entities/notifications';

export abstract class NotificationRepositories {
  abstract create(notification: Notification): Promise<void>;
  abstract findById(notificationID: string): Promise<Notification | null>;
  abstract save(notification: Notification): Promise<void>;
  abstract countManyByRecipientId(recipientId: string): Promise<number>;
}
