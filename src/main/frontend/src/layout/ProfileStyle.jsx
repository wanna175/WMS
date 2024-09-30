import styled from "@emotion/styled";
import theme from "../styles/theme";

export const ProfileModal = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  margin-top: 6vh;
  margin-right: 50px;

  width: 480px;
  height: 40vh;

  background-color: ${theme.colors.glbWhite};
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 3px 6px rgba(0,0,0,0.23);

  display: flex;
  flex-direction: column;
`;