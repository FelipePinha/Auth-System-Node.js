import { transporter } from "../lib/nodemailer";

export class EmailService {
    static async sendMail(email: string, token: string) {
        await transporter.sendMail({
            to: email,
            subject: 'Reset Password',
            html: `<h1>Copy the token to reset your password</h1><p>${token}</p>`
        })
    }
}