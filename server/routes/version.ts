import { ServerError } from '../../common/errors';
import { IServerRES } from '../../common/server';
import express, { Express, Request, Response } from 'express';

const router: Express = express();

interface IVersion {
    version: string;
}

router.get('/', (req: Request, res: Response<IServerRES<IVersion>>) => {
    res.status(200).json({
        err: ServerError.NO_ERROR,
        payload: { version: '0.0.1' }
    });
});

export default router;
