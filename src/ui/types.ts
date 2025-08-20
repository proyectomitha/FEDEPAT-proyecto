export type Festival = {
  id: string;
  name: string;
  description: string;
  locked: boolean;
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

export type Club = {
  id: string;
  name: string;
  direction: string;
};
