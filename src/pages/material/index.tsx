import React, { memo, FC, useEffect, useCallback, useState } from 'react';
import { Button, Card, Pagination, Tabs } from 'antd';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import Bread from '../../components/bread';
import { ReducerActionType } from './types/action.type';
import {
  changeLikePageAction,
  changePageAction,
  deleteMaterialAction,
  getAllTheMaterialsAction,
  getAllTheMaterialsYouLikeAction,
  likeMaterialAction,
} from './store/actions';
import { IRootReducer } from '../../store/types/root-reducer.interface';
import { MaterialWrapper } from './style';
import MImage from './components/image';

enum Tab {
  LIKE = '0',
  ALL = '1',
}

const { TabPane } = Tabs;

const Material: FC = () => {
  const { materialList, likeList, page, likePage } = useSelector(
    (state: IRootReducer) => ({
      materialList: state.material.materialList,
      likeList: state.material.likeList,
      page: state.material.page,
      likePage: state.material.likePage,
    }),
    shallowEqual,
  );

  const dispatch: Dispatch<ReducerActionType> = useDispatch<Dispatch<ReducerActionType>>();

  useEffect(() => {
    // 获取第一页素材
    dispatch(getAllTheMaterialsAction(page.pageNum, page.pageSize));
    // 获取喜欢的素材
    dispatch(getAllTheMaterialsYouLikeAction(likePage.pageNum, likePage.pageSize));
  }, []);

  const likeClickEvent = useCallback((id: number) => {
    dispatch(likeMaterialAction(id));
  }, []);
  const deleteClickEvent = useCallback((id: number) => {
    dispatch(deleteMaterialAction(id));
  }, []);
  const paginationChange = (pageNum: number, pageSize?: number, isLike?: boolean) => {
    if (isLike) {
      dispatch(changeLikePageAction(pageSize || 32, pageNum));
      dispatch(getAllTheMaterialsYouLikeAction(pageNum, pageSize || 32));
    } else {
      dispatch(changePageAction(pageSize || 32, pageNum));
      dispatch(getAllTheMaterialsAction(pageNum, pageSize || 32));
    }
  };

  return (
    <MaterialWrapper>
      <Card title={<Bread />} extra={<Button type="primary">添加素材</Button>}>
        <Tabs tabPosition="left">
          <TabPane tab="全部素材" key={Tab.ALL}>
            <div className="img-box">
              {materialList?.map((item) => (
                <MImage
                  key={item.id}
                  data={item}
                  srcIndex="matter"
                  likeClickEvent={likeClickEvent}
                  deleteClickEvent={deleteClickEvent}
                  id={item.id}
                />
              ))}
            </div>
            <Pagination
              className="pagination-like"
              showSizeChanger={false}
              current={page.pageNum}
              pageSize={page.pageSize}
              onChange={(pageNum: number, pageSize?: number) => paginationChange(pageNum, pageSize, false)}
              total={page.total}
            />
          </TabPane>

          <TabPane tab="我喜欢的" key={Tab.LIKE}>
            <div className="img-box">
              {likeList?.map((item) => (
                <MImage
                  key={item.id}
                  data={item}
                  srcIndex="matter"
                  likeClickEvent={likeClickEvent}
                  deleteClickEvent={deleteClickEvent}
                  id={item.id}
                />
              ))}
            </div>
            <Pagination
              className="pagination-like"
              showSizeChanger={false}
              current={likePage.pageNum}
              pageSize={likePage.pageSize}
              onChange={(pageNum: number, pageSize?: number) => paginationChange(pageNum, pageSize, true)}
              total={likePage.total}
            />
          </TabPane>
        </Tabs>
      </Card>
    </MaterialWrapper>
  );
};

export default memo(Material);
