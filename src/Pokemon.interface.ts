export interface Pokemon {
    name: string;
    abilities: Ability[],
    forms: Form[],
    stats: Stat[],
    types: Type[],
    height: number,
}

export interface Data {
    name: string;
    url: string;
}

export interface Ability {
  ability: {
    name: string;
  }
}

export interface Form {
  name: string;
}

export interface Stat {
  base_stat: number;
  stat: {
    name: string;
  }
}

export interface Type {
  slot: number;
  type: {
    name: string;
  }
}