import './dotenv.config.js'

const port = parseInt(process.env.APP_PORT || '3001');

export const appConfig = {
    port
}
