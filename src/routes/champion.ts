import {Router} from 'express';
import {getChampion, getAllChampions} from '../controllers/champion.js';

const router = Router();

router.get('/', getAllChampions);
router.get('/:champion', getChampion);

export default router;
