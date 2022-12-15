import { SendNotification } from '../../../app/use-cases/send-notifications';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { Controller, Get } from '@nestjs/common';
import { Body, Post } from '@nestjs/common/decorators';
import { NotificationViewModel } from '../view-models/notification-view-model';

@Controller('notifications')
export class NotificationController {
  constructor(private sendNotification: SendNotification) {}
  @Post()
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
