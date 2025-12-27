export type Festivaltype = {
  id: string;
  name: string;
  description: string;
  type: string;
  locked: boolean;
  startDate: Date;
  endDate: Date;
  active: boolean;
};

export type newFestivaltype = {
  name: string;
  description: string;
  type: string;
  startDate: Date;
  endDate: Date;
};

export type Membertype = {
  id: string;
  name: string;
  lastname: string;
  number: string;
  gender: string;
  birth: Date;
};

export type NewMembertype = {
  name: string;
  lastname: string;
  number: string;
  gender: string;
  birth: Date;
};

export type Clubtype = {
  id: string;
  name: string;
  direction: string;
};
