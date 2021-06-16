import styled from 'styled-components';

export const MaterialWrapper = styled.div`
  .img-box {
    display: grid;
    justify-content: space-between;
    grid-template-columns: repeat(auto-fill, 170px);
    grid-gap: 10px;
    flex-wrap: wrap;
    .ant-image {
      width: 150px;
    }
  }
`;
