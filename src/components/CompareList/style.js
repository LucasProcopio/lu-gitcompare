import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 50px;
  overflow-x: auto;
  width: 80%;
`;

export const Repository = styled.div`
  min-width: 250px;
  max-width: 250px;
  background: #fff;
  border-radius: 3px;
  margin: 0 10px;
  display: flex;
  flex-direction: column;

  .action {
    width: 100%;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .delete {
      color: #ff0000;
      font-size: 24px;
      cursor: pointer;
    }
    .sync {
      color: #000000;
      font-size: 24px;
      cursor: pointer;
    }
  }

  header {
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 64px;
    }

    strong {
      font-size: 24px;
      margin-top: 10px;
    }

    small {
      font-size: 14px;
      color: #777;
    }
  }

  ul {
    list-style: none;
  }

  li {
    font-weight: bold;
    padding: 12px 20px;

    small {
      font-weight: normal;
      font-size: 12px;
      color: #999;
      font-style: italic;
    }
    &:nth-child(2n - 1) {
      background: #f5f5f5;
    }
  }
`;
