import Champion from '../models/Champion';

const champions: Champion[] = [
  {
    name: 'Rammus',
    role: 'Tank',
    maxHealth: 800,
    currentHealth: 800,
    sourceType: 'Mana',
    maxSource: 500,
    currentSource: 500,
    abilityPower: 100,
    attackDamage: 40,
    defensePower: 50,
    magicResistance: 30,
  },
  {
    name: 'Zed',
    role: 'Assassin',
    maxHealth: 600,
    currentHealth: 600,
    sourceType: 'Energy',
    maxSource: 200,
    currentSource: 200,
    abilityPower: 100,
    attackDamage: 150,
    defensePower: 50,
    magicResistance: 30,
  },
];

export default champions;
