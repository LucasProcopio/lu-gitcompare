import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 60px;
`;

export const Form = styled.form`
  margin-top: 20px;
  width: 100%;
  max-width: 400px;
  display: flex;

  input {
    flex: 1;
    height: 55px;
    padding: 0 20px;
    background: #f1f1f1;
    border: 0;
    font-size: 18px;
    color: #444;
    border-radius: 3px;
    border: ${props => (props.withError ? "2px solid #F00" : 0)};
  }

  button {
    width: 80px;
    height: 55px;
    padding: 0 20px;
    margin-left: 10px;
    background: #000000;
    color: #f1f1f1;
    border: 0;
    font-size: 20px;
    font-weight: bold;
    border-radius: 3px;
    cursor: pointer;
    &:hover {
      background: #2f2f2f;
    }
  }
`;
