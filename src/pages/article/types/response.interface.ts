export interface IArticleInfo {
    total: number
    pageNum: string
    pageSize: string
    list: IList[]
}

export interface IList {
    id: number;
    title: string;
    content: string;
    status: string;
    channelId: number;
    createTime: string;
    createAt: string;
    updateAt: string;
    cover: string[];
}

export interface IChannel {
    id: number;
    name: string;
    createAt: number;
    updateAt: number;
}
