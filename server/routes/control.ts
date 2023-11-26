import { ServerError } from '../../common/errors';
import { IServerRES } from '../../common/server';
import express, { Express, Request, Response } from 'express';
import { ISong } from '../../common/song';
import {
    playerIsPlaying,
    isPlaying,
    getCurrentSong,
    setVolume,
    resumeSong,
    pauseSong,
    stopSong,
    backSong
} from '../utils/player';

const router: Express = express();

interface ISongPlaying extends ISong {
    currentTime: number;
    volume: number;
    isPlaying: boolean;
}

router.get(
    '/playing',
    (req: Request, res: Response<IServerRES<ISongPlaying>>) => {
        if (!isPlaying()) {
            const NO_SONG_PLAYING: ISongPlaying = {
                isPlaying: false,
                title: '',
                artist: '',
                image: '',
                url: '',
                id: 0,
                duration: 100,
                currentTime: 0,
                volume: getCurrentSong().volume
            };

            res.status(200).json({
                err: ServerError.NO_ERROR,
                payload: NO_SONG_PLAYING
            });

            return;
        }

        const currentSong = getCurrentSong();
        const songPlaying: ISongPlaying = {
            isPlaying: playerIsPlaying(),
            volume: currentSong.volume,
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

router.get('/volume/:volume', (req: Request, res: Response) => {
    const { volume } = req.params;

    if (volume) {
        const vol = parseInt(volume);

        if (vol >= 0 && vol <= 100) {
            setVolume(vol);

            res.status(200).json({
                err: ServerError.NO_ERROR,
                payload: true
            });
        } else {
            res.status(400).json({
                err: ServerError.BAD_REQUEST,
                payload: false
            });
        }
    } else {
        res.status(400).json({
            err: ServerError.BAD_REQUEST,
            payload: false
        });
    }
});

router.get('/startStop', (req: Request, res: Response) => {
    if (playerIsPlaying()) {
        console.log('Pausing song');
        pauseSong();
    } else {
        console.log('Resuming song');
        resumeSong();
    }

    res.status(200).json({
        err: ServerError.NO_ERROR,
        payload: true
    });
});

router.get('/skip', (req: Request, res: Response) => {
    console.log('Skipping song');
    stopSong();

    res.status(200).json({
        err: ServerError.NO_ERROR,
        payload: true
    });
});

router.get('/back', (req: Request, res: Response) => {
    console.log('Going back a song');
    backSong();

    res.status(200).json({
        err: ServerError.NO_ERROR,
        payload: true
    });
});

export default router;
