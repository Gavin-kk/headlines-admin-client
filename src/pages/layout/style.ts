import styled from 'styled-components';
import { leftMenuColor } from '@common/constant/style';

export const LayoutWrapper = styled.div`
  .ant-menu {
    background: ${leftMenuColor};
  }

  .layout {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
  }

  #layout-left.layout-left {
    overflow-y: auto;
    background: ${leftMenuColor} !important;
  }

  .ant-layout-sider-trigger {
    width: 100%;
    background: ${leftMenuColor};
  }

  .layout-header {
    background: #fff;
  }
`;

export const LeftNavBarWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  width: 100%;
  height: 96px;
  text-align: center;
  transition: all 0.2s;

  .text > span {
    width: 100%;
    height: 100%;
    white-space: nowrap;
    overflow: hidden;
    display: inline-block;
    color: white;
    line-height: 100px;
    font-size: 24px;
    transition: all 0.2s;
    background: ${leftMenuColor};
  }

  .img-box {
    width: 100%;
    height: 100%;
    line-height: 100px;
    transition: all 0.2s;

    img {
      width: 50px;
      height: 20px;
      transition: all 0.2s;
    }
  }
`;
