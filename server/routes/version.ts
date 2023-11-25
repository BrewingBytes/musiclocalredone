import express, { Express, Request, Response } from 'express';

const router: Express = express();

router.get('/', (req: Request, res: Response) => {
    res.status(200).json({ version: '0.0.1' });
});

export default router;
