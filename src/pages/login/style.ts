import styled from 'styled-components';
import bg from '@assets/img/login_bg.ec9bf219.jpg';

export const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: url("${bg}") no-repeat;
  background-size: cover;
  min-height: 500px;
  
  >.dialog {
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
