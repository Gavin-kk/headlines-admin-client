import { IActionType } from '@src/store/types/action.interface';
import { ArticleStatus } from '../components/table';
import { ActionType } from '../store/constant';
import { IGetArticleListLoad } from './request.interface';
import { IArticle } from './response.interface';

export type GetArticleListAction = IActionType<ActionType.GET_LIST_OF_ARTICLES, IGetArticleListLoad>
export type ChangeArticleListAction = IActionType<ActionType.CHANGE_LIST_OF_ARTICLES, IArticle>

export type ReducerActionType = GetArticleListAction | ChangeArticleListAction
