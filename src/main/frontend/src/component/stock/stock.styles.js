import styled from "@emotion/styled";
import theme from "../../styles/theme";

export const Wrapper = styled.div`
  height: 500px;
  width: 700px;
`;

export const Title = styled.div`
  width: 100%;
  padding-top: 6px;
  text-align: center;
  font-size: 16px;
  font-weight: bold;


  @media screen and (max-width: 767px) {
    /*모바일 */
    font-size: 20px;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;
