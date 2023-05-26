import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
    async sendEmail(to: string, subject: string, text: string) {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: true, // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_USER, // generated ethereal user
                pass: process.env.EMAIL_PASS, // generated ethereal password
            },
        });

        const mailOptions = {
            from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_FROM}>`,
            to,
            subject,
            text,
        };

        const info = await transporter.sendMail(mailOptions);

        console.log('E-mail enviado:', info.messageId);
    }
}
