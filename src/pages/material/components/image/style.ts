import styled from 'styled-components';

export const MImageWrapper = styled.div`
  .wrapper {
    position: relative;
    padding: 10px;
    .operation-bar {
      transition: all 0.3s;
      position: absolute;
      bottom: 15px;
      left: 50%;
      transform: translateX(-50%);
      width: 150px;
      height: 25px;
      background: rgba(0, 0, 0, 0.3);
      .love_icon {
        position: absolute;
        left: 20px;
        line-height: 25px;
        svg {
          color: white;
        }
        &:hover {
          svg {
            color: red;
          }
        }
      }
      .delete_icon {
        position: absolute;
        right: 20px;
        line-height: 25px;
        svg {
          color: white;
        }
        &:hover {
          svg {
            color: red;
          }
        }
      }
      .active {
        svg {
          color: red;
        }
      }
    }
  }
`;
