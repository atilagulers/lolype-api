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

import Champion from './models/Champion.js';
interface Player {
  socketId: string | undefined;
  name: string;
  //champion: Champion;
  //hp: number;
}

enum GameState {
  Waiting = 'waiting',
  ChampionSelection = 'champion_selection',
  RoundStart = 'round_start',
  RoundEnd = 'round_end',
  Finished = 'finished',
}

interface Room {
  id: string;
  players: Player[];
  gameState: GameState;
}

const activeRooms: Room[] = [];

io.on('connection', (socket) => {
  console.log(socket.id + ' CONNECTED');

  socket.on('create-room', (player: Player) => {
    const roomID = nanoid(6);
    socket.join(roomID);

    const newRoom: Room = {
      id: roomID,
      players: [],
      gameState: GameState.Waiting,
    };

    newRoom.players.push(player);

    activeRooms.push(newRoom);
    io.to(roomID).emit('room-created', newRoom);
  });

  socket.on(
    'join-room',
    ({roomID, player}: {roomID: string; player: Player}) => {
      const foundRoom = activeRooms.find((room) => room.id === roomID);

      if (foundRoom) {
        socket.join(roomID);

        if (foundRoom.players.length >= 2) {
          socket.emit('room-full');
          return;
        }

        foundRoom.players.push(player);

        io.to(roomID).emit('joined-room', foundRoom);
        io.to(roomID).emit('room-updated', foundRoom);
      } else {
        socket.emit('room-not-found', roomID);
      }
    }
  );

  //socket.on('check-player-count', (room) => {
  //  const foundRoom = activeRooms.find((room) => room.id === roomID);
  //});
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
