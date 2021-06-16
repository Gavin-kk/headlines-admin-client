import {
  ChangeLikeListAction,
  ChangeMaterialListAction,
  DeleteMaterialAction,
  GetAllTheMaterialsAction,
  GetAllTheMaterialsYouLikeAction,
  LikeMaterialAction,
  UnlikeMaterialAction,
} from '../types/action.type';
import { IMaterial } from '../types/response.interface';
import { ActionType } from './constant';
// 获取全部素材
export const getAllTheMaterialsAction: GetAllTheMaterialsAction = {
  type: ActionType.GET_ALL_THE_MATERIALS,
  data: null,
};
// 获取个人喜欢的所有素材
export const getAllTheMaterialsYouLikeAction: GetAllTheMaterialsYouLikeAction = {
  type: ActionType.GET_ALL_THE_MATERIALS_YOU_LIKE,
  data: null,
};
// 改变素材列表
export const changeMaterialListAction = (list: IMaterial[]): ChangeMaterialListAction => ({
  type: ActionType.CHANGE_MATERIAL_LIST,
  data: {
    list,
  },
});
// 删除素材
export const deleteMaterialAction = (id: number): DeleteMaterialAction => ({
  type: ActionType.DELETE_MATERIAL,
  data: {
    id,
  },
});
// 喜欢素材
export const likeMaterialAction = (id: number): LikeMaterialAction => ({
  type: ActionType.LIKE_MATERIAL,
  data: {
    id,
  },
});
export const changeLikeListAction = (list: IMaterial[]): ChangeLikeListAction => ({
  type: ActionType.CHANGE_LIKE_LIST,
  data: {
    list,
  },
});
// 取消喜欢素材
export const unlikeMaterialAction = (id: number): UnlikeMaterialAction => ({
  type: ActionType.UNLIKE_MATERIAL,
  data: {
    id,
  },
});
