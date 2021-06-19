import React, { memo, FC, useEffect, useMemo, useCallback } from 'react';
import { Button, Card, Table } from 'antd';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { ColumnType } from 'antd/lib/table/interface';
import moment from 'moment';
import Bread from '../../components/bread';
import { getArticleListAction } from '../article/store/actions';
import { IRootReducer } from '../../store/types/root-reducer.interface';
import { IList, WhetherCommentType } from '../article/types/response.interface';
import { commentSwitch } from './store/actions';

const Discuss: FC = () => {
  const { articleInfo } = useSelector(
    (state: IRootReducer) => ({
      articleInfo: state.article.articleInfo,
    }),
    shallowEqual,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getArticleListAction({}));
  }, []);

  const columns: ColumnType<IList>[] = useMemo(
    () => [
      {
        title: '标题',
        dataIndex: 'title',
        width: 400,
      },
      {
        title: '评论总数',
        dataIndex: 'totalComments',
      },
      {
        title: '是否可评论',
        dataIndex: 'whetherComment',
        render(whetherCommentInfo: WhetherCommentType): JSX.Element {
          return <span>{whetherCommentInfo.data[0] === 1 ? '正常评论' : '禁止评论'}</span>;
        },
      },
      {
        title: '创建时间',
        dataIndex: 'createAt',
        render(time: string): JSX.Element {
          return <span>{moment(time).format('llll')}</span>;
        },
      },
      {
        title: '更新时间',
        dataIndex: 'updateAt',
        render(time: string): JSX.Element {
          return <span>{moment(time).format('llll')}</span>;
        },
      },
      {
        title: '操作',
        render(data: IList): JSX.Element {
          const commentSwitchClickEvent = () => {
            dispatch(commentSwitch(data.id));
          };
          return data.whetherComment.data[0] ? (
            <Button danger onClick={commentSwitchClickEvent}>
              关闭评论
            </Button>
          ) : (
            <Button type="primary" onClick={commentSwitchClickEvent}>
              开启评论
            </Button>
          );
        },
      },
    ],
    [],
  );

  const paginationChangeEvent = useCallback((pageNum: number, pageSize?: number) => {
    dispatch(getArticleListAction({ pageNum, pageSize }));
  }, []);

  const TableRender = useMemo(
    () => (
      <Table
        dataSource={articleInfo?.list}
        columns={columns}
        rowKey="id"
        pagination={{
          pageSize: articleInfo?.pageSize,
          current: articleInfo?.pageNum,
          total: articleInfo?.total,
          onChange: paginationChangeEvent,
        }}
      />
    ),
    [articleInfo],
  );
  return <Card title={<Bread />}>{TableRender}</Card>;
};

export default memo(Discuss);
