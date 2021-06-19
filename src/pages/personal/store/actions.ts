import { ActionType } from '@pages/personal/store/constant';
import { ICity } from '@pages/personal/types/response.interface';
import { CascaderOptionType } from 'antd/lib/cascader';
import {
  AddCurrentSelectedOptionChildAction,
  ChangeCascadeOptionAction,
  ChangeCurrentCascadeOptionLoadingAction,
  ChangeListOfCitiesAction,
  GetListOfCitiesAction,
} from '../types/action.type';

export const getListOfCitiesAction = (
  id: number,
  cascaderOption: CascaderOptionType | null,
): GetListOfCitiesAction => ({
  type: ActionType.GET_CITY_LIST,
  data: {
    id,
    cascaderOption,
  },
});
export const changeListOfCitiesAction = (data: ICity[]): ChangeListOfCitiesAction => ({
  type: ActionType.CHANGE_CITY_LIST,
  data,
});

// 改变级联状态
export const changeCascadeOptionAction = (data: CascaderOptionType[]): ChangeCascadeOptionAction => ({
  type: ActionType.CHANGE_CASCADE_OPTIONS,
  data,
});

// 改变loading 状态
export const changeCurrentCascadeOptionLoadingAction = (
  index: number,
  isLoading: boolean,
): ChangeCurrentCascadeOptionLoadingAction => ({
  type: ActionType.CHANGE_CURRENT_CASCADE_OPTION_lOADING,
  data: {
    index,
    isLoading,
  },
});

// 改变级联当前选择加载的option的child
export const addCurrentSelectedOptionChildAction = (
  child: CascaderOptionType[],
  index: number,
): AddCurrentSelectedOptionChildAction => ({
  type: ActionType.ADD_CURRENT_SELECTED_OPTION_CHILD,
  data: {
    child,
    index,
  },
});

// 改变当前是叶子节点
