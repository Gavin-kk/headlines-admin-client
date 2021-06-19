import React, { memo, FC } from 'react';
import { Image, Popconfirm } from 'antd';
import fault from '@assets/img/fault-tolerant.png';
import Loading from '@components/loading';
import { DeleteOutlined, HeartOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import { MImageWrapper } from './style';

interface IProps {
  data: any;
  srcIndex: string;
  likeClickEvent: (id: number) => void;
  deleteClickEvent: (id: number) => void;
  id: number;
}

const MImage: FC<IProps> = ({ likeClickEvent, deleteClickEvent, data, srcIndex, id }) => (
  <MImageWrapper>
    <div className="wrapper">
      <Image
        src={data[srcIndex]}
        width={150}
        preview
        fallback={fault}
        placeholder={<Loading />}
        className="preview-img"
      />
      <div className="operation-bar">
        <HeartOutlined
          className={classnames({ active: data.like && data.like.data[0] === 1 }, 'love_icon')}
          onClick={() => likeClickEvent(id)}
        />
        <Popconfirm title="确定要删除吗" onConfirm={() => deleteClickEvent(id)} okText="是" cancelText="否">
          <DeleteOutlined className="delete_icon" />
        </Popconfirm>
      </div>
    </div>
  </MImageWrapper>
);

export default memo(MImage);
