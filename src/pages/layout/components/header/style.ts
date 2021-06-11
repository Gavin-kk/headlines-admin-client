import styled from 'styled-components';

export const HeaderWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  .header-left-box {
    width: 100px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    
    img {
      width:40px;
      height: 40px;
      border-radius: 50%;
    }
    .username {
      margin-left: 8px;
    }
    .user-icon {
      margin: 2px 10px 0 3px;
    }
  }
  
`;

export const ContentWrapper = styled.div`
  a {
    display: block;
    margin: 5px 0;
  }
`;
