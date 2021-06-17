import styled from 'styled-components';

export const MaterialWrapper = styled.div`
  .img-box {
    display: grid;
    justify-content: space-between;
    grid-template-columns: repeat(auto-fill, 170px);
    grid-gap: 10px;
    flex-wrap: wrap;
    position: relative;

    .ant-image {
      width: 150px;
      height: 150px;
      object-fit: fill;
      vertical-align: top;

      .ant-image-mask {
        height: 146px;
      }
    }
  }

  .pagination-like {
    margin-top: 15px;
    //padding: 0 10px;
  }
`;
