import { ForkEffect, takeEvery, put, select } from 'redux-saga/effects';
import { ActionType } from '@pages/personal/store/constant';
import { AxiosResponse } from 'axios';
import { IResponse } from '@services/types/response.interface';
import { getCityListRequest } from '@services/personal.request';
import { ICity } from '@pages/personal/types/response.interface';
import {
  addCurrentSelectedOptionChildAction,
  changeCascadeOptionAction,
  changeCurrentCascadeOptionLoadingAction,
} from '@pages/personal/store/actions';
import { message } from 'antd';
import { CascaderOptionType } from 'antd/lib/cascader';
import { IRootReducer } from '@src/store/types/root-reducer.interface';
import { GetListOfCitiesAction } from '../types/action.type';

function* getCtiyList(action: GetListOfCitiesAction) {
  const { id, cascaderOption } = action.data;
  const { personal }: IRootReducer = yield select((state: IRootReducer) => state);

  try {
    if (!personal.cascaderOption.length) {
      const result: AxiosResponse<IResponse<ICity[]>> = yield getCityListRequest(id);
      const cascadeOption: CascaderOptionType[] = handleCascadeOption(result.data.data);
      yield put(changeCascadeOptionAction(cascadeOption));
    } else {
      const index = personal.cascaderOption.findIndex((item) => item.value === id);
      console.log(index);
      // console.log(index);
      yield put(changeCurrentCascadeOptionLoadingAction(index, true));
      const result: AxiosResponse<IResponse<ICity[]>> = yield getCityListRequest(id);
      // console.log(result);
      if (!result.data.data.length) {
        // yield put();
      }
      // console.log(id);

      const cascadeOption: CascaderOptionType[] = handleCascadeOption(result.data.data);
      yield put(addCurrentSelectedOptionChildAction(cascadeOption, index));
      yield put(changeCurrentCascadeOptionLoadingAction(index, false));
    }
  } catch (err) {
    console.log(err.message);
    yield message.error('请求城市列表失败');
  }
}

function* saga(): Generator<ForkEffect<never>> {
  yield takeEvery(ActionType.GET_CITY_LIST, getCtiyList);
}
// 额外方法
const handleCascadeOption = (list: ICity[]): CascaderOptionType[] =>
  list.map((item) => ({
    value: item.id,
    label: item.placeName,
    isLeaf: false,
  }));

export default saga;
