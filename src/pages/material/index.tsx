import React, { memo, FC, useEffect, useState, useCallback } from 'react';
import { Button, Card, Tabs, Image, Spin, message, notification } from 'antd';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import fault from '@assets/img/fault-tolerant.png';
import Bread from '../../components/bread';
import { ReducerActionType } from './types/action.type';
import { getAllTheMaterialsAction, getAllTheMaterialsYouLikeAction } from './store/actions';
import { IRootReducer } from '../../store/types/root-reducer.interface';
import { MaterialWrapper } from './style';
import Loading from '../../components/loading';

enum Tab {
  LIKE = '0',
  ALL = '1',
}

const { TabPane } = Tabs;
const Material: FC = () => {
  const { materialList } = useSelector(
    (state: IRootReducer) => ({
      materialList: state.material.materialList,
    }),
    shallowEqual,
  );

  const dispatch: Dispatch<ReducerActionType> = useDispatch<Dispatch<ReducerActionType>>();
  const [current, setCurrent] = useState<string>(Tab.ALL);
  const [align, setAlignment] = useState<boolean>(true);
  const [whetherToPreviewIndex, setWhetherToPreviewIndex] = useState<number | null>(null);

  useEffect(() => {
    const args = {
      message: '图片预览说明',
      description: '双击图片启动图片预览',
      duration: 0,
    };
    notification.warn(args);
    // 获取全部素材
    dispatch(getAllTheMaterialsAction);
  }, []);

  useEffect(() => {
    if (materialList && materialList.length % 9 !== 0) {
      setAlignment(false);
    }
  }, [materialList]);

  const tabChange = (key: string) => {
    if (key === Tab.ALL) {
      dispatch(getAllTheMaterialsAction);
    } else {
      dispatch(getAllTheMaterialsYouLikeAction);
    }
    setCurrent(key);
  };

  const pictureDoubleClickEvent = useCallback((index: number) => {
    setWhetherToPreviewIndex(index);
  }, []);

  return (
    <MaterialWrapper justifyContent={align}>
      <Card title={<Bread />} extra={<Button type="primary">添加素材</Button>}>
        <Tabs activeKey={current} tabPosition="left" onChange={tabChange}>
          <TabPane tab="全部素材" key={Tab.ALL}>
            <div className="img-box">
              {materialList?.map((item, index) => (
                <Image
                  key={item.id}
                  src={item.matter}
                  width={150}
                  preview={index === whetherToPreviewIndex}
                  onDoubleClick={() => pictureDoubleClickEvent(index)}
                  fallback={fault}
                  placeholder={<Loading />}
                />
              ))}
            </div>
          </TabPane>
          <TabPane tab="我喜欢的" key={Tab.LIKE}>
            <div className="img-box">
              {materialList?.map((item, index) => (
                <Image
                  key={item.id}
                  src={item.matter}
                  width={150}
                  preview={index === whetherToPreviewIndex}
                  onDoubleClick={() => pictureDoubleClickEvent(index)}
                  fallback={fault}
                  placeholder={<div>loading</div>}
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
