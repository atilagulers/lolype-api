import dotenv from 'dotenv';
dotenv.config();

import http from 'http';
import {Server} from 'socket.io';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import {nanoid} from 'nanoid';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

app.use(helmet());
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//* routers
import championRouter from './routes/champion.js';

//* middlewares
import errorHandler from './middlewares/errorHandler.js';

//* routes
app.use('/api/v1/champion', championRouter);

app.get('/', (req, res) => res.send('Hello'));

app.use(errorHandler);

io.on('connection', (socket) => {
  console.log(socket.id + ' CONNECTED');

  socket.on('send-message', (message, room) => {
    console.log(message);
    // everyone
    //io.emit('receive-message', 'Message received');

    // everyone except sender
    console.log('room ' + room);
    //if (!room) {
    //  socket.broadcast.emit('receive-message', message);
    //} else {
    //  socket.to(room).emit('receive-message', message);
    //}

    socket.on('join-room', (room) => {
      socket.join(room);
    });
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
