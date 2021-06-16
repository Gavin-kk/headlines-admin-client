import styled from 'styled-components';

export const Video = styled.video`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 1;
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

export const LoginWrapper = styled.div`
  .show {
    display: none;
  }

  .login-enter {
    opacity: 0;
  }

  .login-enter-active {
    opacity: 1;
    transition: all 2s;
  }

  .login-enter-done {
    opacity: 1;
    transition: all 2s;
  }

  .dialog {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    width: 400px;
    height: 370px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 0 25px 20px rgb(0 0 0 / 30%);

    .login-form {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 10px;

      .form {
        width: 350px;

        .login-form-button {
          width: 100%;
        }
      }
    }

    .logo {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 200px;
      height: 100px;
      margin: 0 auto;
    }
  }
`;

export const LoginBtnWrapper = styled.div`
  width: 100%;
  height: 100%;

  .hide {
    display: none;
  }

  .box {
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 4;
    transform: translate(-50%, -50%);

    img {
      display: block;
      width: 761px;
      height: 64px;
    }

    .btn-box {
      width: 100%;
      display: flex;
      justify-content: center;

      > .btn {
        display: inline-block;
        width: 82px;
        height: 36px;
        line-height: 36px;
        text-align: center;
        color: white;
        transition: all 0.3s;
        border-radius: 8px;
        margin: 20px 20px;
      }

      .login-btn {
        cursor: pointer;
        background: rgb(240, 65, 66);
        border: 1px solid rgb(240, 65, 66);

        &:hover {
          transition: all 0.3s;
          background: rgb(255, 133, 133);
          border: 1px solid rgb(255, 133, 133);
        }
      }

      .register-btn {
        background: rgba(255, 255, 255, 0);
        border: 1px solid #fff;

        .ant-btn {
          border: none;
          background: rgba(255, 255, 255, 0);
          color: white;
        }
      }
    }
  }
`;

export const RegisterBtnWrapper = styled.div`
  position: relative;
  z-index: 4;
  width: 82px;
  height: 36px;
  background: rgb(240, 65, 66);
  color: white;
`;
