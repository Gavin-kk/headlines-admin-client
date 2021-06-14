import React, {
  memo, FC, useState, useEffect,
} from 'react';
import request from '@services/request';
import { AxiosResponse } from 'axios';
import { IResponse } from '@services/types/response.interface';

// 引入编辑器组件
import BraftEditor, { EditorState } from 'braft-editor';
// 引入编辑器样式
import 'braft-editor/dist/index.css';
import { message } from 'antd';
import { fileUpload } from '@services/publish.request';
import { Params, uploadFn } from '../types/request.interface';

interface IProps {
  value: string;
  onChange: (value:string)=>void;
}

const RichBraftEditor: FC<IProps> = ({ onChange, value }) => {
  // const [imgUrls, setImgUrls] = useState<string[]>([]);
  const handleEditorChange = (editorState:EditorState) => {
    onChange(editorState.toHTML());
  };

  // 文章内容文件上传
  const uploadFn:uploadFn = async (param: Params) => {
    const data: FormData = new FormData();
    // if (param.file.type.indexOf('image') === -1) {
    //   message.error('仅可上传图片');
    //   param.error({ msg: '仅可上传图片' });
    //   return;
    // }
    data.append('files', param.file);
    try {
      const result: AxiosResponse<IResponse<string[]>> = await fileUpload(data);

      // setImgUrls((value: string[]) => {
      //   const newImgUrls: string[] = [...value];
      //   result.data.data.forEach((item) => {
      //     newImgUrls.push(item);
      //   });
      //   return newImgUrls;
      // });

      param.success({
        url: result.data.data[0],
        meta: {
          id: 'file',
          title: 'file',
          alt: 'img加载失败',
          loop: true, // 指定音视频是否循环播放
          autoPlay: true, // 指定音视频是否自动播放
          controls: true, // 指定音视频是否显示控制栏
          poster: '', // 指定视频播放器的封面
        },
      });
    } catch (err) {
      param.error({ msg: `上传失败:${err.response.data.message}` });
    }
  };

  return (
    <BraftEditor
      style={{ border: '1px solid #ccc' }}
      value={value}
      onChange={handleEditorChange}
      media={{
        uploadFn,
      }}
    />
  );
};

export default memo(RichBraftEditor);
