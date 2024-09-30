import * as S from "./login.styles";
//presenter는 props를 통해 데이터를 받아 화면에 표현
//이를 위해 스타일시트를 포함함. 데이터X
//요구데이터만 인자로 넘겨주면됨
export default function LoginUI(props) {
  return (
<S.Container>
      {/* 왼쪽 설명 섹션 */}
      <S.LeftPanel>
        {/*이미지 넣기*/}
      </S.LeftPanel>

      {/* 오른쪽 로그인 폼 섹션 */}
      <S.RightPanel>
        <S.Logo alt="Login" />
        <S.InputWrapper>
          <S.Input
            type="text"
            {...props.register("userId", { required: true })}
            placeholder="사원번호를 입력하세요."
          />
          {props.errors.userId && (
            <S.ErrorText>아이디를 입력해주세요.</S.ErrorText>
          )}
        </S.InputWrapper>

        <S.InputWrapper>
          <S.Input
            type="password"
            {...props.register("password", { required: true })}
            placeholder="비밀번호를 입력하세요."
          />
          {props.errors.password && (
            <S.ErrorText>비밀번호를 입력해주세요.</S.ErrorText>
          )}
        </S.InputWrapper>

        <S.ButtonWrapper>
        <S.CancelButton onClick={props.onClickJoin}>Join</S.CancelButton>
        <S.SubmitButton
          isActive={props.isValid}
          type="submit"
          onClick={props.handleSubmit(props.onSubmitBoard, props.onError)}
        >
          Sign in
        </S.SubmitButton>
      </S.ButtonWrapper>
      </S.RightPanel>
    </S.Container>
  );
}

// export default function LoginUI(props) {
//   return (
//     <S.Wrapper>
//       <S.Title>Login</S.Title>
//       <S.InputWrapper>
//         <S.Label>사원번호</S.Label>
//         <S.Input
//           type="text"
//           {...props.register("employeeNumber", { required: true })}
//           placeholder="사원번호를 작성해주세요."
//         />
//         {props.errors.employeeNumber && (
//           <S.Error>사원번호를 입력해주세요.</S.Error>
//         )}
//       </S.InputWrapper>
//       <S.InputWrapper>
//         <S.Label>비밀번호</S.Label>
//         <S.Input
//           type="password"
//           {...props.register("password", { required: true })}
//           placeholder="비밀번호를 작성해주세요."
//         />
//         {props.errors.password && <S.Error>비밀번호를 입력해주세요.</S.Error>}
//       </S.InputWrapper>
//       <S.ButtonWrapper>
//         <S.CancelButton onClick={props.onClickJoin}>Join</S.CancelButton>
//         <S.SubmitButton
//           isActive={props.isValid}
//           type="submit"
//           onClick={props.handleSubmit(props.onSubmitBoard, props.onError)}
//         >
//           Sign in
//         </S.SubmitButton>
//       </S.ButtonWrapper>
//     </S.Wrapper>
//   );
// }
