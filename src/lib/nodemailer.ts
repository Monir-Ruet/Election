import nodemailer from "nodemailer";

export class Nodemailer {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
    }

    async sendMail(to: string, subject: string, html: string) {
        await this.transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to,
            subject,
            html,
        });
    }
}