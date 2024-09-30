import styled from '@emotion/styled';
import { SearchOutlined } from '@ant-design/icons';
import theme from '../styles/theme';
import { Table, Button, Select, Calendar, Modal } from 'antd';

// Table 컴포넌트를 styled-components로 스타일링
//테이블 스타일링
export const Htable = styled(Table)`
.ant-table {
    font-size: 30px;  /* 셀 폰트 크기 */
    padding: 10px 12px;  /* 셀 패딩 */
}

.ant-table-thead > tr > th {
    background-color: #fafafa;
    border-top-radius: 15px;  /* 헤더 테두리 */
    font-size: 16px; /* 폰트 크기*/
}

.ant-table-cell {
    font-size: 13px;  /* 폰트 크기 */
    font-weight: 200; /*폰트 굵기*/
}

.ant-table-cell-control-interactive {
    width: 80px;  /* 컨트롤 크기 */
}

.ant-table-pagination {
    justify-content: center;
    aligen-items: flex-start;
    border-color: ${theme.colors.glbDarkGreen};
    
}
`;

//검색창 스타일링
export const HSelectWrapper = styled.div`
    display: flex;            //요소 가로로 정렬
    flex-direction: row;      //itmes를 수평축(왼쪽에서 오른쪽으로)으로 표시
    ailgen-items: center;     //items각 줄 가운데 정렬
    width: 500px;               //가로너비설정
`;

export const HSelect = styled(Select)`
    font-weight: bold;
`;

export const HButtonWrapper = styled.div`
  display: flex;                    // 가로로 요소를 배치
  align-items: center;              // 세로로 가운데 정렬
  justify-content: flex-end;        // 버튼을 오른쪽으로 정렬
`;

export const HButtonDefault = styled(Button)`
   align-items: center;          // 버튼의 내용(텍스트, 아이콘)을 가운데 정렬
  justify-content: center;      // 버튼의 내용을 수평으로 가운데 정렬
  padding: 8px 16px;            // 버튼의 내부 여백을 설정
  font-size: 16px;              // 버튼 텍스트의 크기를 16px로 설정
  background-color: ${theme.colors.glbLightOrange};    // 버튼의 배경색을 설정
  color: white;                 // 텍스트 색상을 흰색으로 설정
  border: none;                 // 버튼의 테두리를 없애기
    cursor: pointer;             // 커서는 포인터
  &:hover {                     // hover 상태에서 버튼의 스타일 변경->적용이안됨
    background-color: rgb(230, 70, 20)};
    }    // hover 시 배경색을 진한 오렌지로 변경
`;

export const HButtonFail = styled(Button)`
   align-items: center;          // 버튼의 내용(텍스트, 아이콘)을 가운데 정렬
  justify-content: center;      // 버튼의 내용을 수평으로 가운데 정렬
  padding: 8px 16px;            // 버튼의 내부 여백을 설정
  font-size: 16px;              // 버튼 텍스트의 크기를 16px로 설정
  background-color: red;        // 버튼의 배경색을 설정
  color: white;                 // 텍스트 색상을 흰색으로 설정
  border: none;                 // 버튼의 테두리를 없애기
    cursor: pointer;             // 커서는 포인터
  &:hover {                     // hover 상태에서 버튼의 스타일 변경->적용이안됨
    background-color: rgb(230, 70, 20)};
    }    // hover 시 배경색을 진한 오렌지로 변경
`;

export const HButtonSuccess = styled(Button)`
   align-items: center;          // 버튼의 내용(텍스트, 아이콘)을 가운데 정렬
  justify-content: center;      // 버튼의 내용을 수평으로 가운데 정렬
  padding: 8px 16px;            // 버튼의 내부 여백을 설정
  font-size: 16px;              // 버튼 텍스트의 크기를 16px로 설정
  background-color: blue;        // 버튼의 배경색을 설정
  color: white;                 // 텍스트 색상을 흰색으로 설정
  border: none;                 // 버튼의 테두리를 없애기
    cursor: pointer;             // 커서는 포인터
  &:hover {                     // hover 상태에서 버튼의 스타일 변경->적용이안됨
    background-color: rgb(230, 70, 20)};
    }    // hover 시 배경색을 진한 오렌지로 변경
`;