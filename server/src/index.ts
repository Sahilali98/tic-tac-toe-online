import 'dotenv/config';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import morgan from 'morgan';
import { handleSocketConnection } from './sockets/gameHandler';

const app = express();
app.use(cors());
app.use(morgan('dev'));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ['https://tic-tac-toe-online-sandy.vercel.app'],
    methods: ['GET', 'POST'],
  },
});

handleSocketConnection(io);

const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
