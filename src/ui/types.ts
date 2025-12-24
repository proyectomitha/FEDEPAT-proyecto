export type Festival = {
  id: string;
  name: string;
  description: string;
  type: string;
  locked: boolean;
  startDate: Date;
  endDate: Date;
  active: boolean;
};

export type newFestival = {
  name: string;
  description: string;
  type: string;
  startDate: Date;
  endDate: Date;
};

export type Member = {
  id: string;
  name: string;
  lastname: string;
  number: string;
  gender: string;
  birth: Date;
};

export type NewMember = {
  name: string;
  lastname: string;
  number: string;
  gender: string;
  birth: Date;
};

export type Club = {
  id: string;
  name: string;
  direction: string;
};
