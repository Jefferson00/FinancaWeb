import styled from "styled-components";
import { sizes } from "../../../styles/global";

interface ContainerProps {
  background: string;
}

export const Container = styled.div<ContainerProps>`
  width: 100%;
  max-width: 24.5rem;
  border-radius: 20px;
  background: ${(props) => props.background};
  padding: 1rem 2rem;

  max-height: 415px;
  overflow: hidden;
  overflow-y: none;

  &::-webkit-scrollbar {
    width: 4px;
    background: transparent;
  }

  &::-moz-scrollbar {
    width: 4px;
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: transparent;
    background: #d4e3f5;
  }

  section {
    height: 11.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      flex: 1;

      strong {
        font-weight: 600;
        font-size: 1.125rem;
        color: #fff;
      }
    }

    main {
      display: flex;
      justify-content: space-between;
      align-items: center;

      div {
        p {
          color: #fff;
        }
        strong {
          font-weight: 600;
          font-size: 1.125rem;
          color: #fff;
        }
      }
    }

    footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      div {
        p {
          font-size: 0.75rem;
          color: #fff;
        }
      }
    }
  }

  @media (max-width: ${sizes.mobileL}) {
    margin-bottom: 4rem;
  }
`;
export const InvoiceExpanses = styled.div`
  margin-top: 2rem;

  padding-bottom: 2rem;

  > div {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    > p {
      font-size: 0.8rem;
      color: #fff;
    }
  }
`;
export const Item = styled.div`
  height: 5rem;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 1rem;

  display: flex;
  justify-content: space-between;

  cursor: pointer;

  span {
    width: 2.5rem;
    height: 2.5rem;
    background: #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  div {
    text-align: right;
    p {
      color: #09192d;
    }
    strong {
      color: #fff;
    }
  }
`;
