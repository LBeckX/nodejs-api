import {appConfig} from "./configs/app.config.js";
import {ExpressService} from "./services/express.service.js";
import authRoutes from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import "reflect-metadata"
import {databaseConfig} from "./configs/database.config.js";

const expressService = new ExpressService();

try {
    await databaseConfig.initialize()
    console.log('Database initialized')
} catch (e) {
    console.error(e)
    process.exit(1)
}

expressService.app.use('/api/v1/auth', authRoutes);

expressService.app.use('/api/v1/user', userRouter);

expressService.app.get('/ping', (req, res) => {
    console.log('ping/pong');
    res.send('pong');
});

expressService.start(appConfig.port);