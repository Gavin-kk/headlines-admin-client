import { IActionType } from '@src/store/types/action.interface';
import { IList } from '@pages/material/types/response.interface';
import { ActionType } from '../store/constant';

export type GetAllTheMaterialsAction = IActionType<
  ActionType.GET_ALL_THE_MATERIALS,
  { pageNum: number; pageSize: number }
>;
export type GetAllTheMaterialsYouLikeAction = IActionType<
  ActionType.GET_ALL_THE_MATERIALS_YOU_LIKE,
  { pageNum: number; pageSize: number }
>;
export type DeleteMaterialAction = IActionType<ActionType.DELETE_MATERIAL, { id: number }>;
export type LikeMaterialAction = IActionType<ActionType.LIKE_MATERIAL, { id: number }>;
export type ChangeMaterialListAction = IActionType<ActionType.CHANGE_MATERIAL_LIST, { list: IList[] }>;
export type ChangeLikeListAction = IActionType<ActionType.CHANGE_LIKE_LIST, { list: IList[] }>;
export type ChangePageAction = IActionType<
  ActionType.CHANGE_PAGE,
  { pageSize: number; pageNum: number; total?: number }
>;
export type ChangeLikePageAction = IActionType<
  ActionType.CHANGE_LIKE_PAGE,
  { pageSize: number; pageNum: number; total?: number }
>;

export type ReducerActionType =
  | GetAllTheMaterialsAction
  | GetAllTheMaterialsYouLikeAction
  | DeleteMaterialAction
  | LikeMaterialAction
  | ChangeMaterialListAction
  | ChangeLikeListAction
  | ChangePageAction
  | ChangeLikePageAction;
