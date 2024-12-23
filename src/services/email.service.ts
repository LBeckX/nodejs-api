import {emailConfig} from "../configs/email.config.js";
import path from "node:path";
import Email from "email-templates";

export class EmailService {
    static emailBaseConfig: Email.EmailConfig = {
        message: {
            from: emailConfig.from,
        },
        send: !emailConfig.debug,
        preview: emailConfig.debug,
        transport: {
            from: emailConfig.from,
            host: emailConfig.host,
            port: emailConfig.port,
            secure: emailConfig.secure,
            auth: {
                user: emailConfig.user,
                pass: emailConfig.password,
            },
            logger: true,
            debug: emailConfig.debug,
            dnsTimeout: 10000,
            greetingTimeout: 10000,
            connectionTimeout: 10000,
            socketTimeout: 10000,
        },
        juice: true,
        juiceResources: {
            applyStyleTags: true,
            webResources: {
                relativeTo: path.resolve('emails')
            }
        },
    }

    static email = new Email(EmailService.emailBaseConfig);

    static async sendMessage(args: { email: string, subject: string, headline: string, message: string }) {
        return EmailService.email.send({
            template: 'message',
            message: {
                to: args.email
            },
            locals: args,
        })
    }

    static async sendRegistration(args: {
        email: string,
        returnUrl: string,
        token: string
    }) {
        return EmailService.email.send({
            template: 'registration',
            message: {
                to: args.email
            },
            locals: args,
        })
    }
}