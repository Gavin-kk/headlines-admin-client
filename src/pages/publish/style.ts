import styled from 'styled-components';

export const CoverUploadUploadWrapper = styled.div`
  position: relative;
  height: 170px;
  .cover-upload-btn {
    position: absolute;
    width: 170px;
    height: 170px;
    margin: 0 5px;
    border: 1px solid #ccc;
    background: rgb(250, 250, 250);
    cursor: pointer;

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
      top: 40%;
    }

    .cover-upload-title {
      top: 60%;
    }
  }

  .cover-upload-box {
    display: flex;
    justify-content: space-between;
    max-width: 600px;
    overflow: hidden;

    .cover-upload-img {
      width: 170px;
      height: 170px;
      margin: 0 5px;
      background: #666666;
    }
  }
`;
