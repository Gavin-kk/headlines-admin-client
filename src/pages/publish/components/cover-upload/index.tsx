import React, { memo, FC, useState } from 'react';
import {
  Image, message, Upload,
} from 'antd';
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { BASE_URL } from '@services/config';
import { IResponse } from '@services/types/response.interface';
import { CoverUploadWrapper } from './style';

interface IProps {
  onChange: (value:string)=>void;
  disabled: boolean;
  imageUrl: string;
}

function beforeUpload(file:File) {
  const limit = file.type.indexOf('image') === -1;
  if (limit) {
    message.error('仅可上传图片文件');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;

  return !limit && isLt2M;
}

const CoverUpload: FC<IProps> = ({ onChange, imageUrl, disabled }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const handleChange = (info :UploadChangeParam<UploadFile<IResponse<string[]>>>) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
    }
    if (info.file.status === 'done' && info.file.response?.data) {
      setLoading(false);
      onChange(info.file.response?.data[0]);
    }
  };
  return (
    <CoverUploadWrapper>
      <Upload
        name="files"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action={`${BASE_URL}/article/upload/file`}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        disabled={disabled}
      >
        {imageUrl ? <Image src={imageUrl} alt="cover" /> : uploadButton}
      </Upload>
    </CoverUploadWrapper>

  );
};

export default memo(CoverUpload);
