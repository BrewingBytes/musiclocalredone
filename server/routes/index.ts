import express, { Express, Request, Response } from 'express';
import testRouter from './test';

const router: Express = express();

router.use('/test', testRouter);
router.use('*', (req: Request, res: Response) => {
    res.status(404).send('Not Found');
});

export default router;
