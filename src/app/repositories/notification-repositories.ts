import { Notification } from '../entities/notifications';

export abstract class NotificationRepositories {
  abstract create(notification: Notification): Promise<void>;
}
