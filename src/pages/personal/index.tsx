import React, { memo, FC, useEffect } from 'react';
import { Button, Card, Cascader, DatePicker, Form, Input, Radio } from 'antd';
import { CascaderOptionType } from 'antd/lib/cascader';
import { AxiosResponse } from 'axios';
import Bread from '../../components/bread';
import { ICity } from './types/response.interface';
import { getCityListRequest } from '../../services/personal.request';
import { IResponse } from '../../services/types/response.interface';

const layout = {
  labelCol: { span: 0 },
  wrapperCol: { span: 12 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Personal: FC = () => {
  const [options, setOptions] = React.useState<CascaderOptionType[]>([]);

  useEffect(() => {
    // 默认将获得省级城市
    if (!options.length) {
      requestAFirstLevelList(1).then((res) => {
        setOptions(handleCascadeOption(res));
      });
    }
  }, []);

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const onChange = (...arg: any[]) => {
    console.log(arg);
  };

  const loadData = async (selectedOptions?: CascaderOptionType[]) => {
    if (selectedOptions) {
      const targetOption = selectedOptions[selectedOptions.length - 1];
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
  const handleCascadeOption = (list: ICity[]): CascaderOptionType[] =>
    list.map((item) => ({
      value: item.id,
      label: item.placeName,
      isLeaf: false,
    }));

  const requestAFirstLevelList = async (id: number): Promise<ICity[]> => {
    const {
      data: { data },
    }: AxiosResponse<IResponse<ICity[]>> = await getCityListRequest(id);
    return data;
  };
  return (
    <Card title={<Bread />}>
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item label="昵称" name="nickname">
          <Input />
        </Form.Item>
        <Form.Item label="介绍" name="intro">
          <Input />
        </Form.Item>

        <Form.Item name="gender" label="性别">
          <Radio.Group>
            <Radio value="男">男</Radio>
            <Radio value="女">女</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="dateOfBirth" label="出生日期">
          <DatePicker onChange={onChange} />
        </Form.Item>

        <Form.Item name="city" label="城市">
          <Cascader options={options} loadData={loadData} changeOnSelect />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default memo(Personal);
