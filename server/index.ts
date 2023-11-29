import express, { Express } from 'express';
import { Server } from 'socket.io';
import http from 'http';
import dotenv from 'dotenv';
import cors from 'cors';

import api from './routes';
import { startQueue, updateQueue } from './utils/queue';
import { setVolume, updatePlayingData } from './utils/player';

const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:5001',
    'http://localhost:80',
    'http://localhost',
    'http://music.local',
    'http://music.local:80'
];

async function main() {
    setVolume(0);
    dotenv.config();

    const app: Express = express();
    const port = process.env.PORT || 5001;

    // Create socket.io
    const server = http.createServer(app);
    const io = new Server(server, {
        cors: {
            origin: allowedOrigins,
            credentials: false
        }
    });

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

    server.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });

    updatePlayingData(io);
    updateQueue(io);
}

main();
startQueue();
