import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { UserModel } from '../users/models/user.model';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly logger: Logger,
  ) {}
  async sendUserConfirmation(user: UserModel, token: string) {
    const message = `MailService.sendUserConfirmation() user=${JSON.stringify(
      user,
    )} token=${token}`;
    this.logger.log(message);
    const url = `http://localhost:3000/auth/confirm?token=${token}`;
    this.mailerService.sendMail({
      to: user.email,
      from: `"Suppport Team <support@date-night.com>"`,
      subject: 'Welcome to Date Night! Confirm Your Email',
      template: './confirmation.hbs',
      context: {
        username: user.username,
        url,
      },
    });
  }
}
