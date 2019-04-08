import express from 'express';
import socketio from 'socket.io';
import { Server, createServer } from 'http';
import { SocketHandler } from './handlers/socketHandler';
import * as path from 'path';
import bodyParser from 'body-parser';

import fileUpload from 'express-fileupload';

import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

import cors from 'cors';

import * as appconfig from './appconfig.json';

import { twitterService } from './services/twitterService';

const config: any = appconfig;

const app = express();
const PORT = appconfig.port || 3000;
app.set('port', PORT);
// options for cors midddleware
const options: cors.CorsOptions = {
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token'],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: '*',
  preflightContinue: false,
};

app.use(cors(options));

app.use(fileUpload());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const http = createServer(app);
const io = socketio(http);

const dbadapter = new FileSync('db.json');
const db = lowdb(dbadapter);

// db defaults
db.defaults({ tweets: [] })
  .write();

// route controllers
import { ApiRoute } from './routes/api.route';
import { ClientRoute } from './routes/client.route';
import { twitterServiceSocket } from './handlers/tweetServiceSocket';
import { AdminRoute } from './routes/admin.route';
app.use('/api', ApiRoute);
app.use('/admin', AdminRoute);

// socket hookup
const twitterSocket = io.of('/sockets/twitter')
.on('connection', (socket: socketio.Socket) => {
  console.log('Connected on twitter');
  twitterServiceSocket(socket);
});

const standardSocket = io.of('/sockets/client')
.on('connection', (socket: socketio.Socket) => {
  console.log('Connected on standard');
  // handle socket connection
  SocketHandler(socket);
});

app.use('/', ClientRoute);
// launch it
const server = http.listen(PORT, () => {
    console.log('Listening on', PORT);

    setInterval(() => {
      twitterService();
    }, 60 * 1000 * 5);
});

// export what we could potentially need
export { server, io, db, twitterSocket, standardSocket };
