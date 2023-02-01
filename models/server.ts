import express from 'express';
import cors from 'cors';
import { dbConnection } from '../database/config';

class Server {
    private app: any;
    private port: any;
    private usuariosPath: string;

    constructor() {
        this.app = express();
        this.app.set('trust proxy', true);
        this.port = process.env.PORT;
        this.usuariosPath = '/apirest';
        this.conectarDB();
        this.middlewares();
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.usuariosPath, require('../routes/spotify').default);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running in port -> ', this.port);
        });
    }
}

export default Server;