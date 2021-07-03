import styled from "styled-components";

export const HeaderStyled = styled.header`
  padding: 24px;

  border-bottom: solid 1px var(--gray-100);

  .content {
    max-width: 1120px;

    margin: 0 auto;

    display: flex;
    align-items: center;
    justify-content: space-between;

    > a {
      & img {
        max-height: 2.8rem;
      }
    }

    > div {
      display: flex;
      gap: 1rem;
    }
  }
`;
