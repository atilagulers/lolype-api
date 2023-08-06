import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

const app = express();

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
