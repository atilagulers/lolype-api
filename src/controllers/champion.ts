import {Request, Response} from 'express';
import champions from '../data/champions.js';
import {BadRequest} from '../errors/index.js';
import Champion from '../models/Champion.js';

export const getAllChampions = (req: Request, res: Response) => {
  const championList: Champion[] = [];

  for (const champion of champions) {
    const newChampion = new Champion(
      champion.name,
      champion.role,
      champion.maxHealth,
      champion.currentHealth,
      champion.sourceType,
      champion.maxSource,
      champion.currentSource,
      champion.abilityPower,
      champion.attackDamage,
      champion.defensePower,
      champion.magicResistance
    );

    championList.push(newChampion);
  }
  res.json(championList);
};

export const getChampion = (req: Request, res: Response) => {
  const {champion} = req.params;

  const matchedChampionData = champions.find(
    (champ) => champ.name.toLowerCase() === champion.toLowerCase()
  );

  if (!matchedChampionData) {
    throw new BadRequest('CHAMPION NOT FOUND');
  }

  const matchedChampion = new Champion(
    matchedChampionData.name,
    matchedChampionData.role,
    matchedChampionData.maxHealth,
    matchedChampionData.currentHealth,
    matchedChampionData.sourceType,
    matchedChampionData.maxSource,
    matchedChampionData.currentSource,
    matchedChampionData.abilityPower,
    matchedChampionData.attackDamage,
    matchedChampionData.defensePower,
    matchedChampionData.magicResistance
  );

  res.json(matchedChampion);
};
