import express, { Express, Request, Response } from 'express';
import YouTube = require('youtube-node');

const router: Express = express();

interface ISearchQuery extends Request {
    body: {
        query: string;
    };
}

router.post('/query', (req: ISearchQuery, res: Response) => {
    const { query } = req.body;

    const yt = new YouTube();

    yt.setKey(process.env.YOUTUBE_API_KEY || '');
    yt.addParam('type', 'video');
    

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    yt.search(query, 10, (err: any, result: any) => {
        if (err) {
            console.log(err);
            res.status(500).json({ err: 'Internal Server Error' });
        } else {
            res.status(200).json({ err: 'NO_ERROR', payload: result.items });
        }
    });
});

export default router;
