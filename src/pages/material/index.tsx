import React, { memo, FC, useEffect, useCallback, useState } from 'react';
import { Card, Pagination, Tabs } from 'antd';
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
import AddMaterial from './components/add-material';

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
  // 给分页设置一个动态默认值 防止闪烁
  const [defaultPage, setDefaultPage] = useState<number>(30);
  const [defaultLikePage, setDefaultLikePage] = useState<number>(30);

  const dispatch: Dispatch<ReducerActionType> = useDispatch<Dispatch<ReducerActionType>>();

  useEffect(() => {
    // 获取第一页素材
    dispatch(getAllTheMaterialsAction(page.pageNum, page.pageSize));
    // 获取喜欢的素材
    dispatch(getAllTheMaterialsYouLikeAction(likePage.pageNum, likePage.pageSize));
  }, []);

  useEffect(() => {
    if (page.total) {
      setDefaultPage(page.total);
    }
    if (likePage.total) {
      setDefaultLikePage(likePage.total);
    }
  }, [page, likePage]);

  // 图片的喜欢点击事件
  const likeClickEvent = useCallback((id: number) => {
    dispatch(likeMaterialAction(id));
  }, []);
  // 图片的删除点击事件
  const deleteClickEvent = useCallback((id: number) => {
    dispatch(deleteMaterialAction(id, 'show'));
  }, []);

  // 分页处理
  const paginationChange = useCallback(
    (pageNum: number, pageSize?: number, isLike?: boolean) => {
      if (isLike) {
        dispatch(changeLikePageAction(pageSize || 32, pageNum, defaultLikePage));
        dispatch(getAllTheMaterialsYouLikeAction(pageNum, pageSize || defaultLikePage));
      } else {
        dispatch(changePageAction(pageSize || 32, pageNum, defaultPage));
        dispatch(getAllTheMaterialsAction(pageNum, pageSize || defaultPage));
      }
    },
    [defaultPage, defaultLikePage],
  );
  // 渲染素材组件  // 渲染喜欢的素材组件
  const handleAllImgRender = useCallback(
    (list: any[] | null) =>
      list?.map((item) => (
        <MImage
          key={item.id}
          data={item}
          srcIndex="matter"
          likeClickEvent={likeClickEvent}
          deleteClickEvent={deleteClickEvent}
          id={item.id}
        />
      )),
    [],
  );

  const handlePagination = useCallback(
    (p: { pageSize: number; pageNum: number; total?: number }, isLike: boolean) => {
      // 每页大小
      const pageSizeGlobal: string[] = ['32', '64', '128', '256'];
      return (
        <Pagination
          className="pagination-like"
          current={p.pageNum}
          pageSize={p.pageSize}
          onChange={(pageNum: number, pageSize?: number) => paginationChange(pageNum, pageSize, isLike)}
          total={p.total || defaultPage}
          showSizeChanger
          pageSizeOptions={pageSizeGlobal}
          showQuickJumper
        />
      );
    },
    [defaultPage, paginationChange],
  );

  return (
    <MaterialWrapper>
      <Card title={<Bread />} extra={<AddMaterial />}>
        <Tabs tabPosition="left">
          <TabPane tab="全部素材" key={Tab.ALL}>
            <div className="img-box">{handleAllImgRender(materialList)}</div>
            {handlePagination(page, false)}
          </TabPane>

          <TabPane tab="我喜欢的" key={Tab.LIKE}>
            <div className="img-box">{handleAllImgRender(likeList)}</div>
            {handlePagination(likePage, true)}
          </TabPane>
        </Tabs>
      </Card>
    </MaterialWrapper>
  );
};

export default memo(Material);
