const port = parseInt(process.env.APP_PORT || '3001');
const secret = process.env.SECRET_KEY;

export const appConfig = {
    port,
    secret,
    jwtExpire: '1d',
    maxLoginAttempts: 5,
    banTime: 60 * 1000,
}
