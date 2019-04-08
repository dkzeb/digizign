import { Request, Response, Router } from 'express';
import * as path from 'path';

const allowedExt = ['.js', '.ico', '.css', '.jpg', '.png'];

const router: Router = Router();

router.get('/privacypolicy', (req: Request, res: Response) => {
  const pppath = path.join(__dirname, '../../lib/pp.html');
  res.sendFile(pppath);
});

router.get('*', (req: Request, res: Response) => {
    const clientPath = path.join(__dirname, '../../dist/client');
    if (allowedExt.filter((ext) => req.url.indexOf(ext) > 0).length > 0) {
      res.sendFile(path.resolve(`${clientPath}/${req.url}`));
    } else {
      res.sendFile(path.resolve(`${clientPath}/index.html`));
    }
});

export const ClientRoute = router;
