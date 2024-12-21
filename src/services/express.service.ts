import express, {Express} from "express";
import cors from "cors";
import * as http from "node:http";

export class ExpressService {

    public readonly app: Express;

    public server: http.Server;

    constructor() {
        this.app = express();
        this.app.use(express.text());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(cors())
    }

    public start(port: number) {
        this.server = this.app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
}