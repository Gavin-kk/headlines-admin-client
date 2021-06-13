import { ArticleStatus } from '@pages/article/components/table';

export interface IGetArticleListLoad {
    status?: ArticleStatus;
    channelId?: number;
    startTime?: number;
    endTime?: number;
    pageNum?: number;
    pageSize?: number;
}
