import "reflect-metadata"
import './configs/dotenv.config.js'
import {appConfig} from "./configs/app.config.js";
import {ExpressService} from "./services/express.service.js";
import authRoutes from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import {databaseConfig} from "./configs/database.config.js";
import {plainToInstance} from "class-transformer";
import {EnvDto} from "./dto/env.dto.js";
import {validateOrReject} from "class-validator";
import {needAuth} from "./middlewares/auth.middleware.js";

const expressService = new ExpressService();

const envDto = plainToInstance(EnvDto, process.env, {excludeExtraneousValues: true});

try {
    await validateOrReject(envDto)
} catch (e) {
    console.error('Env validation error', e)
    process.exit(1)
}

try {
    await databaseConfig.initialize()
    console.log('Database initialized')
} catch (e) {
    console.error(e)
    process.exit(1)
}

expressService.app.use('/api/v1/auth', authRoutes);

expressService.app.use('/api/v1/user', needAuth, userRouter);

expressService.app.get('/ping', (req, res) => {
    console.log('ping/pong');
    res.send('pong');
});

expressService.start(appConfig.port);