export interface IArticle {
    total: number
    pageNum: number
    pageSize: number
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
