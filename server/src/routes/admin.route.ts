import { Request, Response, Router } from 'express';
import { standardSocket, db } from '../app';
import basicAuth from 'express-basic-auth';
import * as path from 'path';
import * as crypto from 'crypto';
import { json } from 'body-parser';

const allowedExt = ['.js', '.ico', '.css', '.jpg', '.png'];

// super secret users for the admin page
const authConfig = {
    users: {
        zeb: 'm1t4UH4ck',
        auhack: 'AUHackErDeBedste',
    },
    challenge: true,
    realm: 'DigiZign Admin',
};

const router: Router = Router();

router.post('/cmd', basicAuth(authConfig), (req: Request, res: Response) => {
    console.log('got params', req.body);
    standardSocket.send(req.body.cmd + ': ' + req.body.value);
    res.json({
        data: 'cmd sent',
    });
});

router.post('/slides', basicAuth(authConfig), (req: Request, res: Response) => {
    if (req.files) {
        console.log('req.files', req.files);
        const storagePath = path.join(__dirname, '../../../storage/slides/', (req.files.file as any).name);
        console.log('Storage', storagePath);
        (req.files.file as any).mv(storagePath);

        const d = new Date();
        const hashID = crypto.createHash('sha1')
                            .update(d + (req.files.file as any).name).digest('hex');
        db.get('slides').push(
            {
                id: hashID,
                filename: (req.files.file as any).name,
            },
        ).write();

        res.status(200).send('OK');
    } else {
        res.status(500).send('ERROR');
    }
});

router.post('/announce', basicAuth(authConfig), (req: Request, res: Response) => {
    console.log(req.body);

    standardSocket.send('announce: ' + JSON.stringify(req.body));

    res.status(200).send('OK');
});

router.delete('/slide/:id', basicAuth(authConfig), (req: Request, res: Response) => {
    console.log('Deleting slide with ID:', req.params.id);
    db.get('slides').remove({
        id: req.params.id,
    }).write();
    res.status(200).send('OK');
});

router.get('*', basicAuth(authConfig), (req: Request, res: Response) => {
    const clientPath = path.join(__dirname, '../adminPages');
    if (allowedExt.filter((ext) => req.url.indexOf(ext) > 0).length > 0) {
      res.sendFile(path.resolve(`${clientPath}/${req.url}`));
    } else {
      res.sendFile(path.resolve(`${clientPath}/index.html`));
    }
});

export const AdminRoute = router;
