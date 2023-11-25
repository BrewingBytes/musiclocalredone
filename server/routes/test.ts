import express, { Express, Request, Response } from 'express';

const router: Express = express();

router.get('/', (req: Request, res: Response) => {
    res.send('It works!');
});

export default router;
