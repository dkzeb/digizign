import { Request, Response, Router } from 'express';
import { io, db } from '../app';
import * as path from 'path';
import * as fetch from 'node-fetch';

const router: Router = Router();

router.get('/clients', (req: Request, res: Response) => {
    res.json({
        clients: Object.keys(io.sockets.sockets),
    });
});

router.get('/tweets', (req: Request, res: Response) => {
    res.json(db.get('tweets').value());
});

router.get('/tweets/random', (req: Request, res: Response) => {
    const max = db.get('tweets').size().value();
    console.log('we have', max, 'tweets');
    const randomIndex = Math.floor(Math.random() * max);
    console.log('retrieving', randomIndex);
    const tweets = db.get('tweets').value();
    res.json(tweets[randomIndex]);
});

router.get('/slides', (req: Request, res: Response) => {
    console.log('Retrieving Slides...');
    const slides = db.get('slides').value();
    console.log('slides', slides);
    res.json(slides);
});

router.get('/slide/:filename', (req: Request, res: Response) => {
    const storagePath = path.join(__dirname, '../../../storage/slides/', req.params.filename);
    console.log('serving', storagePath);
    res.sendFile(storagePath);
});

export const ApiRoute = router;
