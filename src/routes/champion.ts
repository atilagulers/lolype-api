import {Router, Request, Response} from 'express';
import champions from '../data/champions.js';
//import {BadRequest} from '../errors/BadRequest.js';

const router = Router();

router.get('/:champion', (req: Request, res: Response) => {
  const {champion} = req.params;

  const matchedChampion = champions.find(
    (champ) => champ.name.toLowerCase() === champion
  );

  if (!matchedChampion) {
    //throw new BadRequest('CHAMPION NOT FOUND');
  }

  res.json(matchedChampion);

  res.send('CHAMPION NOT FOUND');
});

export default router;
