import { Injectable } from '@nestjs/common';
import { INotificationService } from './notification.interface';
import { EmailService } from './email.service';
import { NotificationTransport } from './notification.enum';

type NotificationConfig = {
  type: NotificationTransport;
  message: { title?: string; body: string };
  to: string;
};

type NotificationPayload = {
  configs: NotificationConfig[];
  metadata?: Record<string, string>;
};

@Injectable()
export class NotificationService
  implements INotificationService<NotificationPayload>
{
  constructor(private readonly emailService: EmailService) {}

  async notify({ configs }: NotificationPayload): Promise<void> {
    for (const config of configs) {
      if (config.type === NotificationTransport.EMAIL) {
        this.emailService.sendMail(
          config.to,
          config.message.title ?? 'Notification from Patient Management System',
          config.message.body,
        );
      }
    }
  }
}
