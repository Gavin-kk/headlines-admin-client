import { ArticleStatus } from '@pages/article/components/table';

export interface ISubmit {
    title: string;
    channel: number;
    content:string | null;
    cover?:string;
    status?: ArticleStatus
}
