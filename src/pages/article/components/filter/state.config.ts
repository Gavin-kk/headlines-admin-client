import { ArticleStatus } from '../table';

export const stateConfig: { value:string, key:ArticleStatus | string}[] = [
  {
    value: '全部',
    key: 'all',
  },
  {
    value: '草稿',
    key: ArticleStatus.draft,
  },
  {
    value: '待审核',
    key: ArticleStatus.pendingReview,
  },
  {
    value: '审核通过',
    key: ArticleStatus.checkPassed,
  },
  {
    value: '审核失败',
    key: ArticleStatus.auditFailure,
  },
  {
    value: '已删除',
    key: ArticleStatus.deleted,
  },
];
