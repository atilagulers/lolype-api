import {Router, Request, Response} from 'express';
import champions from '../models/Champions.js';

const router = Router();

router.get('/:champion', (req: Request, res: Response) => {
  const {champion} = req.params;
  console.log(champion);
  const matchedChampion = champions.find(
    (champ) => champ.name.toLowerCase() === champion
  );

  if (matchedChampion) res.json(matchedChampion);

  res.send('CHAMPION NOT FOUND');
});

export default router;
