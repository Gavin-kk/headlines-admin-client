import React, { FC, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Modal, Upload } from 'antd';
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';
import { UploadRequestOption as RcCustomRequestOptions } from 'rc-upload/lib/interface';
import { PlusOutlined } from '@ant-design/icons';
import { AxiosResponse } from 'axios';
import { CoverUploadWrapper } from './style';

interface IProps {
  name: string;
  urlIndex: string;
  idIndex: string;
  uploadRequestMethods: (data: FormData) => Promise<AxiosResponse>;
  onChange?: (fileList: UploadFile<any>[]) => void;
  onRemove?: (file: UploadFile) => void | boolean | Promise<void | boolean>;
  children?: JSX.Element;
}

const CoverUpload: FC<IProps> = ({ name, uploadRequestMethods, urlIndex, idIndex, onChange, onRemove, children }) => {
  const [fileList, setFileList] = useState<UploadFile<any>[]>([]);
  const [previewDialogIsShow, setPreviewDialogIsShow] = useState<boolean>(false);
  // 预览上传文件的对话框的title
  const [title, setTitle] = useState<string>('');
  // 当前预览的图片
  const [currentPreviewImage, setCurrentPreviewImage] = useState<string>('');

  useEffect(() => {
    if (onChange) {
      // 每次filelist改变时 触发
      onChange(fileList.filter((item) => item.status === 'done'));
    }
  }, [fileList, onChange]);

  const customRequest = useCallback(
    async (options: RcCustomRequestOptions) => {
      const { file } = options;
      // 伪装成 handleChange里面的图片上传状态
      const imgItem: UploadFile = {
        uid: '1', // 注意，这个uid一定不能少，否则上传失败
        name: 'xx.png',
        status: 'uploading',
        url: '',
        percent: 60, // 注意不要写100。100表示上传完成
      };
      setFileList([imgItem]);

      const data = new window.FormData();
      data.append(name, file);

      const result = await uploadRequestMethods(data);
      const imgItemDone: UploadFile = {
        uid: String(result.data.data[idIndex]), // 注意，这个uid一定不能少，否则上传失败
        name: result.data.data[urlIndex],
        status: 'done',
        url: result.data.data[urlIndex],
        preview: result.data.data[urlIndex],
      };
      setFileList([...fileList.filter((item) => item.status === 'done'), imgItemDone]);
    },
    [name, fileList],
  );
  // 上传文件change时触发的函数
  const handleChange = useCallback(({ fileList }: UploadChangeParam) => setFileList(fileList), []);
  // 当点击预览时触发的函数
  const handlePreview = useCallback((file: UploadFile) => {
    if (file.url) {
      setCurrentPreviewImage(file.url);
      setTitle(file.name);
      setPreviewDialogIsShow(true);
    }
  }, []);

  const uploadButton = useMemo(
    () => (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>文件上传</div>
      </div>
    ),
    [],
  );

  const handleCancel = useCallback(() => {
    setPreviewDialogIsShow(false);
    setTitle('');
    setCurrentPreviewImage('');
  }, []);

  return (
    <CoverUploadWrapper>
      <Upload
        listType="picture-card"
        customRequest={customRequest}
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        maxCount={8}
        accept="image/png"
        onRemove={onRemove}
        // style={{ width: 204 }}
      >
        {fileList.length >= 8 ? null : <>{uploadButton}</>}
      </Upload>
      {children}
      <Modal visible={previewDialogIsShow} title={title} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={currentPreviewImage} />
      </Modal>
    </CoverUploadWrapper>
  );
};

export default memo(CoverUpload);
