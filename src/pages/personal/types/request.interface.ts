export type CityList = { id: number; city: string };
export interface IData {
  nickname: string;
  phone: string;
  intro: string;
  gender: string;
}
export interface ISubmitData extends IData {
  dateOfBirth: number;
  city: CityList[];
}

export interface IValues extends IData {
  dateOfBirth: any;
  city: number[];
}
