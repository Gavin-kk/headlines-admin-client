import {
  Table, Image, Button, Tag,
} from 'antd';
import React, {
  memo, FC, useEffect, useMemo, useCallback, useState,
} from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { IRootReducer } from '@src/store/types/root-reducer.interface';
import moment from 'moment';
import { faultToleranceImg } from '@src/assets/img/base64/fault-tolerance.img';
import { TableWrapper } from './style';
import { getArticleListAction } from '../../store/actions';
import { IList } from '../../types/response.interface';

export enum ArticleStatus {
  draft = '0',
  pendingReview = '1',
  checkPassed = '2',
  auditFailure = '3',
  deleted = '4',
}

const MTable: FC = () => {
  const { articleInfo } = useSelector((state:IRootReducer) => ({
    articleInfo: state.article.articleInfo,
  }), shallowEqual);

  const [pageNum, setPageNum] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getArticleListAction({}));
  }, []);
  // 处理 状态tag显示
  const handleTag = useCallback((value:string):JSX.Element => {
    let color = '';
    let content = '';
    switch (value) {
      case '1':
        color = '#f5eac1';
        content = '等待审核';
        break;
      case '2':
        color = '#40f824';
        content = '审核通过';
        break;
      case '3':
        color = '#ff0000';
        content = '审核失败';
        break;
      case '4':
        color = '#ffab00';
        content = '已删除';
        break;
      default:
        color = '#108ee9';
        content = '草稿';
    }
    return <Tag color={color}>{content}</Tag>;
  }, []);

  const columns = [
    {
      title: '封面',
      width: 90,
      render(rowData:IList):JSX.Element {
        return (
          <div key={rowData.createTime}>
            { rowData.cover.length
              ? <img src={rowData.cover[0]} alt="封面" width={52} height={52} />
              : (
                <Image
                  width={52}
                  height={52}
                  src="error"
                  fallback={faultToleranceImg}
                />
              )}
          </div>
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
        return (
          <>
            <Button>编辑</Button>
            <Button danger>删除</Button>
          </>
        );
      },
    },
  ];

  const paginationChange = (pageNum:number, pageSize?:number) => {
    dispatch(getArticleListAction({ pageNum, pageSize }));
    setPageNum(pageNum);
    setPageSize(pageSize as number);
  };
  return (
    <TableWrapper>
      <Table
        columns={columns}
        dataSource={articleInfo?.list}
        rowKey="id"
        pagination={{
          pageSize,
          current: pageNum,
          total: articleInfo?.total,
          showQuickJumper: true,
          onChange: paginationChange,
        }}
      />
    </TableWrapper>
  );
};

export default memo(MTable);
