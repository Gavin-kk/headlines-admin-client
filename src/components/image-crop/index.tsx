import React, { memo, FC, useState, useRef, useEffect, useCallback } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css'; // 引入Cropper对应的css
import { ImageCropWrapper } from './style';

interface IProps {
  uploadedImageFile: File;
  onSubmit: (blob: Blob | null) => void;
}

let timer: number | null = null;

const ImageCrop: FC<IProps> = ({ uploadedImageFile, onSubmit }) => {
  const [src, setSrc] = useState<string>();
  const cropperRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const dataURL = e.target?.result;
      if (dataURL) {
        setSrc(dataURL as string);
      }
    };
    fileReader.readAsDataURL(uploadedImageFile);
  }, [uploadedImageFile]);

  const onCrop = useCallback(() => {
    const timeoutFn = () => {
      const imageElement: any = cropperRef?.current;
      const cropper: any = imageElement?.cropper;
      cropper.getCroppedCanvas().toBlob((blob: Blob | null) => {
        onSubmit(blob);
      });
    };
    if (timer) {
      clearTimeout(timer);
      timer = window.setTimeout(timeoutFn, 300);
    } else {
      timer = window.setTimeout(timeoutFn, 300);
    }
  }, [cropperRef.current]);

  return (
    <ImageCropWrapper>
      <Cropper
        src={src}
        className="cropper"
        ref={cropperRef}
        viewMode={1}
        zoomable={false}
        aspectRatio={1} // 固定为1:1  可以自己设置比例, 默认情况为自由比例
        guides={false}
        style={{ width: 400, height: 400 }}
        crop={onCrop}
      />
    </ImageCropWrapper>
  );
};

export default memo(ImageCrop);
