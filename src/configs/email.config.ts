export const emailConfig = {
    debug: Boolean(process.env.SMTP_DEBUG ? parseInt(process.env.SMTP_DEBUG) : 1),
    from: process.env.SMTP_FROM || 'no-reply@mail.com',
    host: process.env.SMTP_HOST || '',
    port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 25,
    user: process.env.SMTP_USER || '',
    password: process.env.SMTP_PASSWORD || '',
    secure: Boolean(process.env.SMTP_SECURE ? parseInt(process.env.SMTP_SECURE) : 1),
}