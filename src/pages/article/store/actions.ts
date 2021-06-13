import { ActionType } from '@pages/article/store/constant';
import { ChangeArticleListAction, GetArticleListAction } from '../types/action.type';
import { IGetArticleListLoad } from '../types/request.interface';
import { IArticle } from '../types/response.interface';
// 获取文章列表
export const getArticleListAction = (ArticleListLoad:IGetArticleListLoad):GetArticleListAction => ({
  type: ActionType.GET_LIST_OF_ARTICLES,
  data: ArticleListLoad,
});
// 更改reducer中的 文章列表
export const changeArticleListAction = (info:IArticle):ChangeArticleListAction => ({
  type: ActionType.CHANGE_LIST_OF_ARTICLES,
  data: info,
});
