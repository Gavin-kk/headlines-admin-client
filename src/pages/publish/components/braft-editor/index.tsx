import React, {
  memo, FC, forwardRef,
} from 'react';
import { AxiosResponse } from 'axios';
import { IResponse } from '@services/types/response.interface';
// 引入编辑器组件
import BraftEditor, { EditorState } from 'braft-editor';
// 引入编辑器样式
import 'braft-editor/dist/index.css';
import { fileUpload } from '@services/publish.request';
import { Params, uploadFn } from '../types/request.interface';

interface IProps {
  value: string | null;
  onChange: (value:string)=>void;
  ref:any
}

// eslint-disable-next-line react/display-name
const RichBraftEditor: FC<IProps> = forwardRef(({ onChange, value }, ref: any) => {
  const handleEditorChange = (editorState:EditorState) => {
    onChange(editorState.toHTML());
  };
  // ref(())
  // 文章内容文件上传
  const uploadFn:uploadFn = async (param: Params) => {
    const data: FormData = new FormData();
    data.append('files', param.file);
    try {
      const result: AxiosResponse<IResponse<string[]>> = await fileUpload(data);
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
      ref={(instance) => {
        ref.current = instance;
      }}
      style={{ border: '1px solid #ccc' }}
      value={value}
      onChange={handleEditorChange}
      media={{
        uploadFn,
      }}
    />
  );
});

export default memo(RichBraftEditor);
