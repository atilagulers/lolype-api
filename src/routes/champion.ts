import {Router} from 'express';
import {getChampion} from '../controllers/champion.js';

const router = Router();

router.get('/:champion', getChampion);

export default router;
