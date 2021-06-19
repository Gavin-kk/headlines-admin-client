import { CascaderOptionType } from 'antd/lib/cascader';
import { ICity } from './response.interface';

export interface IPersonalState {
  city: ICity[];
  cascaderOption: CascaderOptionType[];
}
