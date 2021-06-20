import styled from 'styled-components';

export const ImageCropWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .cropper-canvas {
    img {
      width: 400px;
      height: 400px;
      object-fit: cover;
      border-radius: 12px;
    }
  }
`;
