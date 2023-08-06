type sourceType = 'Mana' | 'Energy' | 'Rage' | 'None';

export default class Champion {
  constructor(
    public name: string,
    public type: 'Tank' | 'Assassin',
    public health: number,
    public sourceType: sourceType,
    public source: number,
    public attackDamage: number,
    public abilityPower: number,
    public armorAD: number,
    public magicResist: number
  ) {}
}
