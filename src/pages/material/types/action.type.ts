import { IActionType } from '@src/store/types/action.interface';
import { IMaterial } from '@pages/material/types/response.interface';
import { ActionType } from '../store/constant';

export type GetAllTheMaterialsAction = IActionType<ActionType.GET_ALL_THE_MATERIALS, null>;
export type GetAllTheMaterialsYouLikeAction = IActionType<ActionType.GET_ALL_THE_MATERIALS_YOU_LIKE, null>;
export type DeleteMaterialAction = IActionType<ActionType.DELETE_MATERIAL, { id: number }>;
export type LikeMaterialAction = IActionType<ActionType.LIKE_MATERIAL, { id: number }>;
export type UnlikeMaterialAction = IActionType<ActionType.UNLIKE_MATERIAL, { id: number }>;
export type ChangeMaterialListAction = IActionType<ActionType.CHANGE_MATERIAL_LIST, { list: IMaterial[] }>;

export type ReducerActionType =
  | GetAllTheMaterialsAction
  | GetAllTheMaterialsYouLikeAction
  | DeleteMaterialAction
  | LikeMaterialAction
  | UnlikeMaterialAction
  | ChangeMaterialListAction;
