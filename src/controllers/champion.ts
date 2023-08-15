import {Request, Response} from 'express';
import champions from '../data/champions.js';
import {BadRequest} from '../errors/index.js';

export const getAllChampions = (req: Request, res: Response) => {
  res.json(champions);
};

export const getChampion = (req: Request, res: Response) => {
  const {champion} = req.params;

  const matchedChampion = champions.find(
    (champ) => champ.name.toLowerCase() === champion
  );

  if (!matchedChampion) {
    throw new BadRequest('CHAMPION NOT FOUND');
  }

  res.json(matchedChampion);
};
