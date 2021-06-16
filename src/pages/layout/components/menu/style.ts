import { leftMenuColor } from '@src/common/constant/style';
import styled from 'styled-components';

export const MenuWrapper = styled.div`
  .menu-color#menu-color {
    background: ${leftMenuColor};
  }

  .ant-menu-dark.ant-menu-dark:not(.ant-menu-horizontal) .ant-menu-item-selected {
    background-color: #50a8c0 !important;
  }
`;
