import { transporter } from "../lib/nodemailer";

export class EmailService {
    static async sendMail(email: string, token: string) {
        await transporter.sendMail({
            to: email,
            subject: 'Reset Password',
            html: `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                
                    <style>
                        h1 {
                        background-color: black;
                        color: white;
                        text-align: center;
                        padding: 12px;
                        }
                        
                        p {
                        text-align: center;
                        margin-top: 50px;
                        border: 2px solid black;
                        padding: 12px;
                        }
                    </style>
                </head>
                <body>
                
                    <h1>Copy the token to reset your password</h1>
                    <p>${token}</p>
                
                </body>
                </html>
            `
        })
    }
}