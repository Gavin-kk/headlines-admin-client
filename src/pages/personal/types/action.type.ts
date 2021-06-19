import { IActionType } from '@src/store/types/action.interface';
import { CascaderOptionType } from 'antd/lib/cascader';
import { ICity } from '@pages/personal/types/response.interface';
import { ActionType } from '../store/constant';

export type GetListOfCitiesAction = IActionType<
  ActionType.GET_CITY_LIST,
  { id: number; cascaderOption: CascaderOptionType | null }
>;
export type ChangeListOfCitiesAction = IActionType<ActionType.CHANGE_CITY_LIST, ICity[]>;
export type ChangeCascadeOptionAction = IActionType<ActionType.CHANGE_CASCADE_OPTIONS, CascaderOptionType[]>;
export type ChangeCurrentCascadeOptionLoadingAction = IActionType<
  ActionType.CHANGE_CURRENT_CASCADE_OPTION_lOADING,
  { index: number; isLoading: boolean }
>;
export type AddCurrentSelectedOptionChildAction = IActionType<
  ActionType.ADD_CURRENT_SELECTED_OPTION_CHILD,
  { child: CascaderOptionType[]; index: number }
>;

export type ReducerActionType =
  | ChangeCurrentCascadeOptionLoadingAction
  | ChangeCascadeOptionAction
  | GetListOfCitiesAction
  | ChangeListOfCitiesAction
  | AddCurrentSelectedOptionChildAction;
