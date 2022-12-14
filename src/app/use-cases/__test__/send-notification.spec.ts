import { SendNotification } from './../send-notification';
describe('send notification', () => {
  it('should be able to send notification', async () => {
    const sendNotification = new SendNotification();

    const { notification } = await sendNotification.execute({
      content: 'Uma nova notificação',
      category: 'Aviso',
      recipientId: 'exemple-recipient-id',
    });

    expect(notification).toBeTruthy();
  });
});
