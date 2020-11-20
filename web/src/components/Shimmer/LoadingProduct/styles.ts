import styled from 'styled-components';

export const Container = styled.div`
  > div {
    width: 14rem;
    background-color: #ffffff;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.8rem;

    .img-skeleton {
      width: 12.2rem;
      height: 12.2rem;
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

  @media (min-width: 750px) {
    > div {
      width: 20rem;
      height: 27rem;

      .img-skeleton {
        width: 18.2rem;
        height: 18.2rem;
      }
    }
  }
`;




