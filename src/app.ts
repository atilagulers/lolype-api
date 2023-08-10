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

interface Player {
  name: string;
  champion: string;
}

interface Room {
  id: string;
  hostPlayer: Player | null;
  otherPlayer: Player | null;
}

const activeRooms: Room[] = [];

io.on('connection', (socket) => {
  console.log(socket.id + ' CONNECTED');

  socket.on('create-room', ({name, champion}: Player) => {
    const roomID = nanoid(6);
    socket.join(roomID);

    const roomData: Room = {
      id: roomID,
      hostPlayer: null,
      otherPlayer: null,
    };

    activeRooms.push(roomData);
    io.to(roomID).emit('room-created', roomID);
  });

  socket.on(
    'join-room',
    ({roomID, playerData}: {roomID: string; playerData: Player}) => {
      const foundRoom = activeRooms.find((room) => room.id === roomID);

      if (foundRoom) {
        socket.join(roomID);

        if (!foundRoom.hostPlayer) {
          foundRoom.hostPlayer = playerData;
        } else if (!foundRoom.otherPlayer) {
          foundRoom.otherPlayer = playerData;
        } else {
          socket.emit('room-full');
          return;
        }

        io.to(roomID).emit('joined-room', foundRoom);
      } else {
        socket.emit('room-not-found', roomID);
      }
    }
  );

  socket.on('send-message', (message, room) => {
    console.log(message);
    // everyone
    //io.emit('receive-message', 'Message received');

    // everyone except sender

    //if (!room) {
    //  socket.broadcast.emit('receive-message', message);
    //} else {
    //  socket.to(room).emit('receive-message', message);
    //}
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// socket.on('create-room', ({name, champion}: Player) => {
//   const roomID = nanoid(6);
//   socket.join(roomID);

//   const hostPlayer: Player = {name, champion};
//   const roomData: Room = {
//     id: roomID,
//     host: hostPlayer,
//     participant: null,
//   };

//   activeRooms.push(roomData);
//   io.to(roomID).emit('room-created', roomID);
// });
