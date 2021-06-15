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

  > .dialog {
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
