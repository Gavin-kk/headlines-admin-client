import React, { memo, FC, useState, useCallback, useMemo } from 'react';
import { Button, message, Modal, Upload } from 'antd';
import { BASE_URL } from '@src/services/config';
import { PlusOutlined } from '@ant-design/icons';
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';
import { UploadRequestOption as RcCustomRequestOptions } from 'rc-upload/lib/interface';
import { uploadMaterialReuqest } from '@src/services/material.request';
import { AxiosResponse } from 'axios';
import { IResponse } from '@services/types/response.interface';
import { deleteMaterialAction } from '@pages/material/store/actions';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { ReducerActionType } from '@pages/material/types/action.type';

const AddMaterial: FC = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [previewVisible, setPreviewVisible] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>('');
  const [fileList, setFileList] = useState<UploadFile<any>[]>([]);
  const [title, setTitle] = useState<string>('');

  const dispatch = useDispatch<Dispatch<ReducerActionType>>();
  const uploadButton = useMemo(
    () => (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    ),
    [],
  );

  // 处理预览 点击预览时显示预览对话框
  const handlePreview = useCallback((file: UploadFile) => {
    if (file.url) {
      setPreviewVisible(true);
      setTitle(file.name);
      setPreviewImage(file?.url);
    }
  }, []);

  // upload 有任何改变时触发
  const handleChange = useCallback(({ fileList }: UploadChangeParam) => {
    setFileList(fileList);
  }, []);

  // 自定义文件上传
  const customRequest = useCallback(
    async (options: RcCustomRequestOptions) => {
      const { file } = options;

      // start：进度条相关
      // 伪装成 handleChange里面的图片上传状态
      const imgItem: UploadFile = {
        uid: '1', // 注意，这个uid一定不能少，否则上传失败
        name: 'hehe.png',
        status: 'uploading',
        url: '',
        percent: 60, // 注意不要写100。100表示上传完成
      };

      setFileList([imgItem]); // 更新 imgList
      // end：进度条相关
      const fileData = new FormData();
      fileData.append('file', file);
      try {
        const result: AxiosResponse<IResponse<{ imgs: string; id: number }>> = await uploadMaterialReuqest(fileData);
        const imgItemDone: UploadFile = {
          uid: String(result.data.data.id), // 注意，这个uid一定不能少，否则上传失败
          name: result.data.data.imgs,
          status: 'done',
          url: result.data.data.imgs,
          preview: result.data.data.imgs,
        };
        const newFileList = [...fileList.filter((item) => item.status === 'done'), imgItemDone];
        // 更新 imgList
        setFileList(newFileList);
      } catch (e) {
        message.error('图片上传失败，请重试');
      }
    },
    [fileList],
  );

  const handleOk = useCallback(() => {
    //    点击ok
  }, []);
  const handleCancel = useCallback(() => {
    // 把所有已经上传 但是取消上传的图片删除
    fileList.forEach((item) => {
      dispatch(deleteMaterialAction(+item.uid, 'auto'));
    });
    // 清空列表
    setFileList([]);
    setIsModalVisible(false);
  }, [fileList]);
  const showModal = useCallback(() => {
    setIsModalVisible(true);
  }, []);
  return (
    <>
      <Button type="primary" onClick={showModal}>
        添加素材
      </Button>
      <Modal
        title="上传素材"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="提交"
        cancelText="取消"
      >
        <Upload
          name="file"
          action={`${BASE_URL}/material/upload/file`}
          listType="picture-card"
          customRequest={customRequest}
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          maxCount={8}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} title={title} footer={null} onCancel={handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </Modal>
    </>
  );
};

export default memo(AddMaterial);
