import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import api from './routes';

const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:5001',
    'http://localhost:80',
    'http://localhost',
    'http://music.local',
    'http://music.local:80'
];

function main() {
    dotenv.config();

    const app: Express = express();
    const port = process.env.PORT || 5001;

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static('public'));
    app.use(
        cors({
            origin: allowedOrigins,
            credentials: false
        })
    );
    app.use(api);

    app.listen(port, () => {
        console.log(
            `⚡️[server]: Server is running at http://localhost:${port}`
        );
    });
}

main();
