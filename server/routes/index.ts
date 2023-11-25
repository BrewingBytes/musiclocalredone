import express, { Express } from 'express';
import version from './version';
import search from './search';
import queue from './queue';

const router: Express = express();

router.use('/version', version);
router.use('/search', search);
router.use('/queue', queue);
router.use('*', (req, res) => {
    res.status(404).json({ err: 'Not Found' });
});

export default router;
