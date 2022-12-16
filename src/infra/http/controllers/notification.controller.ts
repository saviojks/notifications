import { SendNotification } from '../../../app/use-cases/send-notifications';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { Controller, Get, Patch, Body, Post, Param } from '@nestjs/common';
import { NotificationViewModel } from '../view-models/notification-view-model';
import { CancelNotification } from '@app/use-cases/cancel-notifications';
import { ReadNotification } from '@app/use-cases/read-notification';
import { UnreadNotification } from '@app/use-cases/unread-notification';
import { GetRecipientNotifications } from '@app/use-cases/get-recipient-notifications';
import { CountRecipientNotifications } from '@app/use-cases/count-recipient-notifications';

@Controller('notifications')
export class NotificationController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
    private getRecipientNotifications: GetRecipientNotifications,
    private countRecipientNotifications: CountRecipientNotifications,
  ) {}

  @Patch('cancel/:notificationId')
  async cancel(@Param('notificationId') notificationId: string) {
    await this.cancelNotification.execute({ notificationId });
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(
    @Param('recipientId') recipientId: string,
  ): Promise<{ count: number }> {
    const count = await this.countRecipientNotifications.execute({
      recipientId,
    });

    return count;
  }

  @Get('from/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.getRecipientNotifications.execute({
      recipientId,
    });
    return { notifications: notifications.map(NotificationViewModel.toHttp) };
  }

  @Patch('read/:id')
  async read(@Param('id') id: string) {
    await this.readNotification.execute({ notificationId: id });
  }

  @Patch('unread/:id')
  async unread(@Param('id') id: string) {
    await this.unreadNotification.execute({ notificationId: id });
  }

  @Post('')
  async create(@Body() body: CreateNotificationBody) {
    const { content, category, recipientId } = body;
    const { notification } = await this.sendNotification.execute({
      content,
      category,
      recipientId,
    });
    return { notification: NotificationViewModel.toHttp(notification) };
  }
}
