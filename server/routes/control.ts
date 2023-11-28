import { ServerError } from '../../common/errors';
import express, { Express, Request, Response } from 'express';
import {
    playerIsPlaying,
    setVolume,
    resumeSong,
    pauseSong,
    stopSong,
    backSong
} from '../utils/player';

const router: Express = express();

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
