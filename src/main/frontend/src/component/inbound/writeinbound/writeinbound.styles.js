import styled from "@emotion/styled";
import theme from '../../../styles/theme';

export const Wrapper = styled.div`
  height: 500px;
  width: 700px;
`;

export const Button = styled.button`
  background-color: ${theme.colors.glbWhite};
  border: ${theme.borders.greyBorder};
  padding: 4px 15px;
  border-radius: 6px;
  height: 32px;
  font-weight: bold;
  font-size: 16px;

  &: hover {
    color: ${theme.colors.glbOrange};
    background-color: ${theme.colors.glbLightGrey};
    border-color: ${theme.colors.glbOrange};
  }
`;