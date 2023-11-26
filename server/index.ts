import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import loudness from 'loudness';

import api from './routes';
import { startQueue } from './utils/queue';
import { setVolume } from './utils/player';

const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:5001',
    'http://localhost:80',
    'http://localhost',
    'http://music.local',
    'http://music.local:80'
];

async function main() {
    const volume = await loudness.getVolume();
    setVolume(volume);

    dotenv.config();

    const app: Express = express();
    const port = process.env.PORT || 5124;

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

    setInterval(async () => {
        const volume = await loudness.getVolume();
        setVolume(volume);
    }, 10000);
}

main();
startQueue();
