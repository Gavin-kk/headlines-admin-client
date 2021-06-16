import styled from 'styled-components';

export const MaterialWrapper = styled.div.attrs<
  any,
  {
    justifyContent?: boolean;
  }
>({})`
  .img-box {
    //display: flex;
    //justify-content: ${(props) => (props.justifyContent ? 'space-between' : 'normal')};
    //flex-direction: ${(props) => (!props.justifyContent ? 'row' : 'nowrap')};
    //flex-direction: row;
    //justify-content: space-between;
    display: grid;
    justify-content: space-between;
    grid-template-columns: repeat(auto-fill, 170px);
    grid-gap: 10px;
    flex-wrap: wrap;
    .ant-image {
      width: 150px;
      margin: 10px;
    }
  }
`;
