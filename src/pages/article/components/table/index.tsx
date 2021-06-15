import {
  Table, Image, Button, Tag, Popconfirm,
} from 'antd';
import React, {
  memo, FC, useEffect, useMemo, useCallback, Fragment, useState,
} from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { IRootReducer } from '@src/store/types/root-reducer.interface';
import moment from 'moment';
import { faultToleranceImg } from '@src/assets/img/base64/fault-tolerance.img';
import { TableWrapper } from './style';
import { getArticleListAction, deleteArticlesAction } from '../../store/actions';
import { IList } from '../../types/response.interface';

export enum ArticleStatus {
  draft = '0',
  pendingReview = '1',
  checkPassed = '2',
  auditFailure = '3',
  deleted = '4',
}

// 处理 状态tag显示
const handleTag = (value:string):JSX.Element => {
  const arr: { color:string, content:string }[] = [
    { color: 'default', content: '草稿' },
    { color: 'processing', content: '等待审核' },
    { color: 'success', content: '审核通过' },
    { color: 'error', content: '审核失败' },
    { color: 'warning', content: '已删除' },
  ];
  return <Tag color={arr[parseInt(value, 10)].color}>{arr[parseInt(value, 10)].content}</Tag>;
};

const MTable: FC = () => {
  const { articleInfo, articleListLoad } = useSelector((state:IRootReducer) => ({
    articleInfo: state.article.articleInfo,
    articleListLoad: state.article.articleListLoad,
  }), shallowEqual);

  // loading 加载状态
  const [loading, setLoading] = useState<boolean>(true);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getArticleListAction({}));
  }, []);

  useEffect(() => {
    if (articleInfo) {
      setLoading(false);
    }
  }, [articleInfo]);

  const paginationChange = useCallback((pageNum:number, pageSize?:number) => {
    dispatch(getArticleListAction({ pageNum, pageSize, ...articleListLoad }));
  }, [articleListLoad]);

  const columns = useMemo(() => [
    {
      title: '封面',
      width: 90,
      render(rowData:IList):JSX.Element {
        return (
          <Fragment key={rowData.createTime}>
            { rowData.cover.length
              ? <Image src={rowData.cover[0]} alt="封面" width={52} height={52} fallback={faultToleranceImg} />
              : (
                <Image
                  width={52}
                  height={52}
                  src="error"
                  fallback={faultToleranceImg}
                />
              )}
          </Fragment>
        );
      },
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: 300,
    },
    {
      title: '状态',
      dataIndex: 'status',
      render(value:string, rowData:IList) {
        return (
          <span key={rowData.id + parseInt(value, 10)}>
            { handleTag(value) }
          </span>
        );
      },
    },
    {
      title: '发布时间',
      dataIndex: 'createTime',
      render(time:string):JSX.Element {
        return <span>{moment(parseInt(time, 10)).format('llll')}</span>;
      },
    },
    {
      title: '更新时间',
      dataIndex: 'updateAt',
      render(time:string):JSX.Element {
        return <span>{moment(moment(time).valueOf() - (60 * 60 * 8 * 1000)).format('llll')}</span>;
      },
    },
    {
      title: '操作',
      render(rowData: IList):JSX.Element {
        const deleteArticle = () => {
          dispatch(deleteArticlesAction(rowData.id));
        };
        return (
          <>
            <Button type="primary" style={{ margin: '0 10px' }}>编辑</Button>
            <Popconfirm
              title="确定删除吗"
              onConfirm={deleteArticle}
              okText="Yes"
              cancelText="No"
            >
              <Button danger>删除</Button>
            </Popconfirm>
            ,
          </>
        );
      },
    },
  ], []);

  return (
    <TableWrapper>
      <Table
        columns={columns}
        dataSource={articleInfo?.list}
        rowKey="id"
        loading={loading}
        pagination={{
          pageSize: articleInfo?.pageSize ? parseInt(articleInfo?.pageSize, 10) : 10,
          current: articleInfo?.pageNum ? parseInt(articleInfo?.pageNum, 10) : 1,
          total: articleInfo?.total,
          showQuickJumper: true,
          onChange: paginationChange,
          showSizeChanger: true,
          disabled: loading,
        }}
      />
    </TableWrapper>
  );
};

export default memo(MTable);
