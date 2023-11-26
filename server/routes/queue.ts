import { addQueue, getQueue, removeQueue } from '../utils/queue';
import { ServerError } from '../../common/errors';
import { IServerRES } from '../../common/server';
import express, { Express, Request, Response } from 'express';
import { ISong, NO_SONG } from '../../common/song';
import { isPlaying, getCurrentSong } from '../utils/player';

const router: Express = express();

interface ISongAdd extends Request {
    body: {
        song: ISong;
    };
}

interface ISongPlaying extends ISong {
    currentTime: number;
}

router.get('/', (req: Request, res: Response<IServerRES<ISong[]>>) => {
    res.status(200).json({
        err: ServerError.NO_ERROR,
        payload: getQueue()
    });
});

router.get(
    '/playing',
    (req: Request, res: Response<IServerRES<ISongPlaying>>) => {
        if (!isPlaying()) {
            const NO_SONG_PLAYING: ISongPlaying = {
                ...NO_SONG,
                currentTime: 0
            };

            res.status(200).json({
                err: ServerError.NO_ERROR,
                payload: NO_SONG_PLAYING
            });

            return;
        }

        const currentSong = getCurrentSong();
        const songPlaying: ISongPlaying = {
            title: currentSong.currentSong?.title
                ? currentSong.currentSong?.title
                : '',
            url: currentSong.currentSong?.url
                ? currentSong.currentSong?.url
                : '',
            id: currentSong.currentSong?.id,
            currentTime: currentSong.currentSongInfo.progress,
            duration: currentSong.currentSongInfo.duration,
            image: currentSong.currentSong?.image
                ? currentSong.currentSong?.image
                : '',
            artist: currentSong.currentSong?.artist
                ? currentSong.currentSong?.artist
                : ''
        };

        res.status(200).json({
            err: ServerError.NO_ERROR,
            payload: songPlaying
        });
    }
);

router.post('/add', (req: ISongAdd, res: Response<IServerRES<boolean>>) => {
    const { song } = req.body;

    addQueue(song);
    console.log(getQueue());

    res.status(200).json({
        err: ServerError.NO_ERROR,
        payload: true
    });
});

router.post('/remove', (req: ISongAdd, res: Response<IServerRES<boolean>>) => {
    const { song } = req.body;

    removeQueue(song.id ? song.id : 0);

    res.status(200).json({
        err: ServerError.NO_ERROR,
        payload: true
    });
});

export default router;
