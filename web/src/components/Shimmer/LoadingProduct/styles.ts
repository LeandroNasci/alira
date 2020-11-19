import styled from 'styled-components';

export const Container = styled.div`
  > div {
    background-color: #ffffff;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.8rem;

    .img-skeleton {
      width: 12rem;
      height: 12rem;
      margin-bottom: 1rem;
    }

    .row-skeleton {
      height: 1.2rem;

      &:nth-child(2) {
        width: 80%;
      }

      &:nth-child(3) {
        width: 40%;
        margin-top: 0.4rem
      }

      &:nth-child(4) {
        width: 60%;
        height: 1.8rem;
        margin-top: 1.2rem;
        margin-bottom: 0.8rem;
      }
    }
  }
`;




