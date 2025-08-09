import nodemailer from 'nodemailer';

export class EmailSender {
    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST!,
            port: parseInt(process.env.SMTP_PORT!),
            secure: false,
            auth: {
                user: process.env.SMTP_USER!,
                pass: process.env.SMTP_PASS!
            }
        });
    }

    public async sendEmail(to: string, subject: string, body: string) {
        const info = await this.transporter.sendMail({
            from: `"BCElection App" <${process.env.SMTP_USER}>`,
            to,
            subject,
            text: body
        });

        console.log(`Email sent: ${info.messageId}`);
    }
}
