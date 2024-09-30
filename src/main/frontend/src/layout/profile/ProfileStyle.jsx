import styled from "@emotion/styled";
import theme from "../../styles/theme";

export const ProfileModal = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  margin-top: 6vh;
  margin-right: 50px;

  width: 360px;
  height: 300px;

  background-color: ${theme.colors.glbWhite};
  border-radius: 24px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 3px 6px rgba(0, 0, 0, 0.23);

  alignitems: center;
  overflow: hidden;
`;

export const ProfileCard = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 24px;

  alignitems: center;
  overflow: hidden;
`

// 카드 상단 헤더 스타일
export const ProfileHeader = styled.div`
  height: 98px;
  background-color: ${theme.colors.glbOrange};
  color: white;
  padding-top: 32px;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
`;

// 카드 본문 스타일
export const ProfileBody = styled.div`
  text-align: center;
  padding-top: 40px;
`;

// 프로필 이미지 스타일
export const ProfileImg = styled.div`
  position: absolute;
  top: 63px;
  right: 145px;

  width: 70px;
  height: 70px;
  background-color: ${theme.colors.glbDarkOrange};
  border-radius: 50%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 프로필 이미지 텍스트 스타일
export const ProfileText = styled.span`
  font-size: 22px;
  font-weight: bold;
  color: white;
`;

// 사용자 이름 스타일
export const UserName = styled.h2`
  font-size: 18px;
  margin: 10px 0 5px;
`;

// 이메일 텍스트 스타일
export const UserEmail = styled.p`
  font-size: 14px;
  color: #555;
`;

// 아이콘 컨테이너 스타일
export const ProfileIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 25px;
`;

// 아이콘 스타일
export const Icon = styled.button`
  display: flex;
  font-size: 24px;
  color: white;
  background-color: ${theme.colors.glbOrange};
  border-radius: 50%;
  justify-content: center;
  padding: 15px;
  border: none;
  cursor: pointer;
  
  // hover 속성 추가
  &:hover {
    background-color: ${theme.colors.glbDarkOrange};
  }
`;

