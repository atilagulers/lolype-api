type Role = 'Tank' | 'Assassin' | 'Figther';
type SourceType = 'Mana' | 'Energy' | 'Rage' | 'None';

export default class Champion {
  constructor(
    public name: string,
    public role: Role,
    public maxHealth: number,
    public currentHealth: number,
    public sourceType: SourceType,
    public maxSource: number,
    public currentSource: number,
    public abilityPower: number,
    public attackDamage: number,
    public defensePower: number,
    public magicResistance: number
  ) {}
}
