import styled from 'styled-components';

export const LayoutWrapper = styled.div.attrs<any, {bgCol:string}>({
  bgCol: 'rgb(48,98,112)',
})`

  .ant-menu {
    background: ${(props) => props.bgCol};
  }
  
  .layout {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
  }

  #layout-left.layout-left  {
    overflow-y: scroll;
    width: 250px !important;
    max-width: 250px !important;
    flex:0 0 250px !important;
    background: ${(props) => props.bgCol} !important;
  }
  
  
  .layout-header {
    background: #fff;
  }
`;

export const LeftNavBarWrapper = styled.div.attrs<any, {bgCol:string}>({
  bgCol: 'rgb(48,98,112)',
})`
  width: 100%;
  height: 96px;
  text-align: center;

  .text > span {
    width: 100%;
    height: 100%;
    display: inline-block;
    color: white;
    line-height: 100px;
    font-size: 24px;
    background: ${(props) => props.bgCol};
  }
`;
