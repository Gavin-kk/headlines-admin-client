export interface IArticleInfo {
  total: number;
  pageNum: number;
  pageSize: number;
  list: IList[];
}

export interface IList {
  id: number;
  title: string;
  content: string;
  status: string;
  channelId: number;
  createTime: string;
  totalComments: number;
  whetherComment: WhetherCommentType;
  userId: number;
  createAt: string;
  updateAt: string;
  cover: string[];
}
export type WhetherCommentType = {
  type: string;
  data: [0 | 1];
};

export interface IChannel {
  id: number;
  name: string;
  createAt: number;
  updateAt: number;
}
