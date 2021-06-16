import React, { memo, FC, useEffect, useCallback } from 'react';
import { Button, Card, Tabs } from 'antd';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import Bread from '../../components/bread';
import { ReducerActionType } from './types/action.type';
import { getAllTheMaterialsAction, getAllTheMaterialsYouLikeAction, likeMaterialAction } from './store/actions';
import { IRootReducer } from '../../store/types/root-reducer.interface';
import { MaterialWrapper } from './style';
import MImage from './components/image';

enum Tab {
  LIKE = '0',
  ALL = '1',
}

const { TabPane } = Tabs;
const Material: FC = () => {
  const { materialList, likeList } = useSelector(
    (state: IRootReducer) => ({
      materialList: state.material.materialList,
      likeList: state.material.likeList,
    }),
    shallowEqual,
  );

  const dispatch: Dispatch<ReducerActionType> = useDispatch<Dispatch<ReducerActionType>>();

  useEffect(() => {
    const args = {
      message: '图片预览说明',
      description: '双击图片启动图片预览',
      duration: 0,
    };
    // notification.warn(args);
    // 获取全部素材
    dispatch(getAllTheMaterialsAction);
    // 获取喜欢的素材
    dispatch(getAllTheMaterialsYouLikeAction);
  }, []);

  const likeClickEvent = useCallback((id: number) => {
    dispatch(likeMaterialAction(id));
    console.log('like', id);

    //
  }, []);
  const deleteClickEvent = useCallback((id: number) => {
    dispatch(likeMaterialAction(id));
    console.log('del', id);
    //
  }, []);
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
          </TabPane>
        </Tabs>
      </Card>
    </MaterialWrapper>
  );
};

export default memo(Material);
