import styled from 'styled-components';

export const CoverUploadUploadWrapper = styled.div`
  position: relative;
  //height: 170px;
  .cover-upload-btn {
    position: absolute;
    //width: 170px;
    width: 102px;
    //height: 170px;
    height: 102px;
    margin: 0 5px;
    border: 1px dashed rgb(217, 217, 217);
    background: rgb(250, 250, 250);
    cursor: pointer;
    transition: all 0.4s;

    &:hover {
      border: 1px dashed rgb(80, 168, 192);
    }

    .cover-upload {
      display: inline-block;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .up-icon {
      top: 35%;
    }

    .cover-upload-title {
      top: 66%;
    }
  }

  .cover-upload-box {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    width: 100%;
    height: 170px;
    overflow: hidden;

    .cover-upload-img {
      margin: 0 5px;
      background: #666666;

      img {
        width: 170px;
        height: 170px;
        object-fit: cover;
      }
    }
  }

  .ant-upload-picture-card-wrapper,
  .ant-upload-picture-card-wrapper {
    width: auto;
  }
`;
