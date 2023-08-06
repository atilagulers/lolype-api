import Champion from '../models/Champion';

const champions: Champion[] = [
  {
    name: 'Rammus',
    role: 'Tank',
    health: 800,
    sourceType: 'Mana',
    source: 500,
    attackDamage: 40,
    abilityPower: 100,
    armorAD: 50,
    magicResist: 30,
  },
  {
    name: 'Zed',
    role: 'Assassin',
    health: 450,
    sourceType: 'Energy',
    source: 200,
    attackDamage: 150,
    abilityPower: 100,
    armorAD: 50,
    magicResist: 30,
  },
];

export default champions;
