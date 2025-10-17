import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport, Transporter } from 'nodemailer';
import { ConfigKey } from '../config';
import Mail from 'nodemailer/lib/mailer';

@Injectable()
export class EmailService {
  private static transport: Transporter = null;
  private logger: Logger;

  constructor(private readonly configService: ConfigService) {
    this.logger = new Logger(EmailService.name);

    if (EmailService.transport != null) return;

    EmailService.transport = createTransport({
      host: this.configService.get(ConfigKey.SMTP_HOST) ?? 'mailtrap',
      port: this.configService.get(ConfigKey.SMTP_PORT) ?? 25,
      auth: {
        user: this.configService.get(ConfigKey.SMTP_USER) ?? 'code-challenge',
        pass:
          this.configService.get(ConfigKey.SMTP_PASSWORD) ?? 'code-challenge',
      },
      dkim: this.configService.get(ConfigKey.SMTP_DKIM),
    });

    EmailService.transport
      .verify()
      .then((isCorrect: boolean) => {
        if (isCorrect) {
          this.logger.log('Configuration is correct');
        }
      })
      .catch((error: Error) => {
        this.logger.error('Email service failed to verify config', error);
      });
  }

  sendMail<T = any>(
    to: string,
    subject: string,
    text: string,
    html?: string,
    cc?: string,
    bcc?: string,
    attachments?: Mail.Attachment[],
  ) {
    const fromAddress = this.configService.get<string>(ConfigKey.SMTP_FROM);

    return new Promise((resolve, reject) => {
      EmailService.transport.sendMail(
        {
          ...(fromAddress && { from: fromAddress }),
          to,
          subject,
          html,
          text,
          cc,
          bcc,
          attachments,
        },
        (err: Error | null, info: T) => {
          if (err) reject(err);
          resolve(info);
        },
      );
    });
  }
}
