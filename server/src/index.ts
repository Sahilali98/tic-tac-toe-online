import 'dotenv/config';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import morgan from 'morgan';
import { handleSocketConnection } from './sockets/gameHandler';

const app = express();
const allowedOrigins = process.env.CLIENT_URL ? process.env.CLIENT_URL.split(',') : ['http://localhost:3000'];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(morgan('dev'));

const server = http.createServer(app);



const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

app.get('/', (_, res) => {
  res.send('Server running');
});

handleSocketConnection(io);

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
