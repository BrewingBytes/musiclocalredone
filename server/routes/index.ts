import express, { Express } from 'express';
import version from './version';

const router: Express = express();

router.use('/version', version);
router.use('*', (req, res) => {
    res.status(404).json({ err: 'Not Found' });
});

export default router;
