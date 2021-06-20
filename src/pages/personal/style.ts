import styled from 'styled-components';

export const PersonalWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  .personal-form {
    width: 100%;
  }

  .update-avatar {
    width: 600px;

    .head-portrait {
      position: relative;
      width: 250px;
      height: 250px;
      border: 1px dashed #ccc;
      padding: 2px;

      > img {
        width: 100%;
        height: 100%;
        object-fit: fill;
        border-radius: 10px;
      }

      &:hover .avatar-img-mask {
        opacity: 1;
      }

      .avatar-img-mask {
        display: inline-block;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 20;
        background: rgba(0, 0, 0, 0.5);
        transition: all 0.3s;
        text-align: center;
        opacity: 0;
        border-radius: 10px;

        span {
          color: white;
          line-height: 250px;
        }

        .upload-file-input {
          position: absolute;
          left: 0;
          top: 0;
          right: 0;
          bottom: 0;
          opacity: 0;
          z-index: 100;
          cursor: pointer;
          border-radius: 10px;
        }
      }
    }
  }
`;
