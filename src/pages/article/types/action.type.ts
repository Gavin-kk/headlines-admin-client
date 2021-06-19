import { IActionType } from '@src/store/types/action.interface';
import { ActionType } from '../store/constant';
import { IGetArticleListLoad } from './request.interface';
import { IArticleInfo, IChannel } from './response.interface';

export type GetArticleListAction = IActionType<ActionType.GET_LIST_OF_ARTICLES, IGetArticleListLoad>;
export type ChangeArticleListAction = IActionType<ActionType.CHANGE_LIST_OF_ARTICLES, IArticleInfo>;
export type GetChannelListAction = IActionType<ActionType.GET_CHANNEL_LIST, null>;
export type ChangeChannelListAction = IActionType<ActionType.CHANGE_CHANNEL_LIST, IChannel[]>;
export type ChangeArticlesListLoadAction = IActionType<
  ActionType.CHANGE_ARTICLES_LIST_LOAD,
  IGetArticleListLoad | null
>;
export type DeleteArticlesAction = IActionType<ActionType.DELETE_ARTICLES, { id: number }>;

export type ReducerActionType =
  | GetArticleListAction
  | ChangeArticleListAction
  | GetChannelListAction
  | ChangeChannelListAction
  | ChangeArticlesListLoadAction
  | DeleteArticlesAction;
