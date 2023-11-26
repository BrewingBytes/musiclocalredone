import { addQueue, getQueue, removeQueue } from '../utils/queue';
import { ServerError } from '../../common/errors';
import { IServerRES } from '../../common/server';
import express, { Express, Request, Response } from 'express';
import { ISong } from '../../common/song';

const router: Express = express();

interface ISongAdd extends Request {
    body: {
        song: ISong;
    };
}

router.get('/', (req: Request, res: Response<IServerRES<ISong[]>>) => {
    res.status(200).json({
        err: ServerError.NO_ERROR,
        payload: getQueue()
    });
});

router.post('/add', (req: ISongAdd, res: Response<IServerRES<boolean>>) => {
    const { song } = req.body;

    addQueue(song);

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
