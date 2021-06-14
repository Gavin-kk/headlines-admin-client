import { IGetArticleListLoad } from '@pages/article/types/request.interface';
import { IArticleInfo, IChannel } from './response.interface';

export interface IArticleState {
    articleInfo: IArticleInfo | null;
    channelList: IChannel[] | null;
    articleListLoad: IGetArticleListLoad | null;
}
