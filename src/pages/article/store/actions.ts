import { ActionType } from '@pages/article/store/constant';
import {
  ChangeArticleListAction,
  ChangeArticlesListLoadAction, ChangeChannelListAction,
  DeleteArticlesAction, GetArticleListAction, GetChannelListAction,
} from '../types/action.type';
import { IGetArticleListLoad } from '../types/request.interface';
import { IArticleInfo, IChannel } from '../types/response.interface';
// 获取文章列表
export const getArticleListAction = (ArticleListLoad:IGetArticleListLoad):GetArticleListAction => ({
  type: ActionType.GET_LIST_OF_ARTICLES,
  data: ArticleListLoad,
});
// 更改reducer中的 文章列表
export const changeArticleListAction = (info:IArticleInfo):ChangeArticleListAction => ({
  type: ActionType.CHANGE_LIST_OF_ARTICLES,
  data: info,
});

// 获取频道列表
export const getChannelListAction:GetChannelListAction = {
  type: ActionType.GET_CHANNEL_LIST,
  data: null,
};
// 改变reducer频道列表
export const changeChannelListAction = (list:IChannel[]):ChangeChannelListAction => ({
  type: ActionType.CHANGE_CHANNEL_LIST,
  data: list,
});

// 改变切换分页携带的参数
export const changeArticlesListLoadAction = (data:IGetArticleListLoad | null):ChangeArticlesListLoadAction => ({
  type: ActionType.CHANGE_ARTICLES_LIST_LOAD,
  data,
});

// 删除文章
export const deleteArticlesAction = (id:number):DeleteArticlesAction => ({
  type: ActionType.DELETE_ARTICLES,
  data: { id },
});
