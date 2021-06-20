import React, { memo, FC, useEffect, useRef, useCallback, ChangeEvent, useState } from 'react';
import { Button, Card, Cascader, DatePicker, Form, Input, Modal, Radio } from 'antd';
import { CascaderOptionType, CascaderValueType } from 'antd/lib/cascader';
import { AxiosResponse } from 'axios';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import Bread from '../../components/bread';
import { ICity } from './types/response.interface';
import { getCityListRequest } from '../../services/personal.request';
import { IResponse } from '../../services/types/response.interface';
import ImageCrop from '../../components/image-crop';
import { PersonalWrapper } from './style';
import { IRootReducer } from '../../store/types/root-reducer.interface';
import { ReducerActionType } from './types/action.type';
import { editUserInfoAction, submitAvatarAction } from './store/actions';
import { convertFile } from '../../utils/blob-to-file';
import { CityList, ISubmitData, IValues } from './types/request.interface';

const layout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 20 },
};
const tailLayout = {
  wrapperCol: { offset: 2, span: 16 },
};

const { TextArea } = Input;

const Personal: FC = () => {
  const { userinfo } = useSelector(
    (state: IRootReducer) => ({
      userinfo: state.admin.userinfo,
    }),
    shallowEqual,
  );

  const [options, setOptions] = React.useState<CascaderOptionType[]>([]);
  // 当前选择的城市
  const [currentSelectedCity, setCurrentSelectedCity] = useState<CascaderOptionType[]>([]);

  const [uploadImgFile, setUploadImg] = useState<File | null>(null);
  // 最终提交的裁剪好的数据
  const [blobImg, setBlobImg] = useState<Blob | null>(null);
  // 图片对话框
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const dispatch = useDispatch<Dispatch<ReducerActionType>>();
  const uploadRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // 默认将获得省级城市
    if (!options.length) {
      requestAFirstLevelList(1).then((res) => {
        setOptions(handleCascadeOption(res));
      });
    }
  }, []);
  // 请求城市一级列表
  const requestAFirstLevelList = async (id: number): Promise<ICity[]> => {
    const {
      data: { data },
    }: AxiosResponse<IResponse<ICity[]>> = await getCityListRequest(id);
    return data;
  };
  // 选择城市 动态加载
  const loadData = async (selectedOptions?: CascaderOptionType[]) => {
    if (selectedOptions) {
      const targetOption: CascaderOptionType = selectedOptions[selectedOptions.length - 1];
      targetOption.loading = true;
      const cityList: ICity[] = await requestAFirstLevelList(targetOption.value as number);
      const option: CascaderOptionType[] = handleCascadeOption(cityList);
      targetOption.loading = false;
      targetOption.isLeaf = !cityList.length;
      if (cityList.length) {
        targetOption.children = option;
      }
      setOptions([...options]);
    }
  };
  // 线上数据和本地数据渲染的 格式化
  const handleCascadeOption = (list: ICity[]): CascaderOptionType[] =>
    list.map((item) => ({
      value: item.id,
      label: item.placeName,
      isLeaf: false,
    }));
  // 选择的城市改变触发函数
  const citySelectedChange = (value: CascaderValueType, selectedOptions?: CascaderOptionType[]) => {
    if (selectedOptions) {
      setCurrentSelectedCity(selectedOptions);
    }
  };

  const onFinish = (values: IValues) => {
    const selectedCityList = (): CityList[] =>
      currentSelectedCity.map(
        (item): CityList => ({
          id: item.value as number,
          city: item.label as string,
        }),
      );
    const submitData: ISubmitData = {
      city: selectedCityList(),
      gender: values.gender,
      intro: values.intro,
      phone: values.phone,
      nickname: values.nickname,
      dateOfBirth: values.dateOfBirth.format('llll'),
    };
    dispatch(editUserInfoAction(submitData));
  };
  // ImageCrop组件 裁剪好的图片数据的回调
  const imageCropChange = useCallback((blob: Blob | null) => {
    // 裁剪好的图片
    setBlobImg(blob);
  }, []);

  // 上传文件input
  const uploadChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target?.files?.length) {
      setUploadImg(e.target?.files ? e.target?.files[0] : null);
      setIsModalVisible(true);
    } else {
      setIsModalVisible(false);
    }
    if (uploadRef.current) {
      uploadRef.current.value = '';
    }
  };
  // 提交头像
  const handleOk = () => {
    if (blobImg && uploadImgFile) {
      const file: File = convertFile(blobImg, uploadImgFile.name);
      const data = new FormData();
      data.append('avatar', file);
      //  提交裁剪好的图片0
      dispatch(submitAvatarAction(data));
      setIsModalVisible(false);
    }
  };

  const handleCancel = () => {
    //    取消提交
    setIsModalVisible(false);
    setUploadImg(null);
  };
  return (
    <Card title={<Bread />}>
      <PersonalWrapper>
        <div className="personal-form">
          <Form {...layout} name="basic" initialValues={{ gender: '男' }} onFinish={onFinish}>
            <Form.Item label="昵称" name="nickname">
              <Input />
            </Form.Item>

            <Form.Item name="phone" label="手机号">
              <Input />
            </Form.Item>

            <Form.Item label="介绍" name="intro">
              <TextArea style={{ maxHeight: 300 }} />
            </Form.Item>

            <Form.Item name="gender" label="性别">
              <Radio.Group>
                <Radio value="男">男</Radio>
                <Radio value="女">女</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item name="dateOfBirth" label="出生日期">
              <DatePicker />
            </Form.Item>

            <Form.Item name="city" label="城市">
              <Cascader options={options} loadData={loadData} changeOnSelect onChange={citySelectedChange} />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                提交修改
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="update-avatar">
          <div className="head-portrait">
            <img src={userinfo?.avatar} alt="头像" />
            <div className="avatar-img-mask">
              <span>更换头像</span>
              <input type="file" ref={uploadRef} onChange={uploadChange} className="upload-file-input" />
            </div>
          </div>
        </div>
      </PersonalWrapper>
      {/* 上传图片的对话框 */}
      <Modal title="更换头像" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        {uploadImgFile && <ImageCrop onSubmit={imageCropChange} uploadedImageFile={uploadImgFile} />}
      </Modal>
    </Card>
  );
};

export default memo(Personal);
