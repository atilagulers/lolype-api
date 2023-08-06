type Role = 'Tank' | 'Assassin' | 'Figther';
type SourceType = 'Mana' | 'Energy' | 'Rage' | 'None';

export default class Champion {
  constructor(
    public name: string,
    public role: Role,
    public health: number,
    public sourceType: SourceType,
    public source: number,
    public attackDamage: number,
    public abilityPower: number,
    public armorAD: number,
    public magicResist: number
  ) {}
}
