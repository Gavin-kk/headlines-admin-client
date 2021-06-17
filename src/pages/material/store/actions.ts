import {
  ChangeLikeListAction,
  ChangeLikePageAction,
  ChangeMaterialListAction,
  ChangePageAction,
  DeleteMaterialAction,
  GetAllTheMaterialsAction,
  GetAllTheMaterialsYouLikeAction,
  LikeMaterialAction,
} from '../types/action.type';
import { IList } from '../types/response.interface';
import { ActionType } from './constant';
// 获取全部素材
export const getAllTheMaterialsAction = (pageNum: number, pageSize: number): GetAllTheMaterialsAction => ({
  type: ActionType.GET_ALL_THE_MATERIALS,
  data: {
    pageNum,
    pageSize,
  },
});

// 获取个人喜欢的所有素材
export const getAllTheMaterialsYouLikeAction = (
  pageNum: number,
  pageSize: number,
): GetAllTheMaterialsYouLikeAction => ({
  type: ActionType.GET_ALL_THE_MATERIALS_YOU_LIKE,
  data: {
    pageNum,
    pageSize,
  },
});
// 改变素材列表
export const changeMaterialListAction = (list: IList[]): ChangeMaterialListAction => ({
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
// 更改喜欢列表
export const changeLikeListAction = (list: IList[]): ChangeLikeListAction => ({
  type: ActionType.CHANGE_LIKE_LIST,
  data: {
    list,
  },
});

// 改变页码和每页条数
export const changePageAction = (pageSize: number, pageNum: number, total?: number): ChangePageAction => ({
  type: ActionType.CHANGE_PAGE,
  data: {
    pageSize,
    pageNum,
    total,
  },
});
// 改变页码和每页条数
export const changeLikePageAction = (pageSize: number, pageNum: number, total?: number): ChangeLikePageAction => ({
  type: ActionType.CHANGE_LIKE_PAGE,
  data: {
    pageSize,
    pageNum,
    total: total || 27,
  },
});
