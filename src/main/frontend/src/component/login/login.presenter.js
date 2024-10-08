import * as S from "./login.styles";

export default function LoginUI(props) {
  return (
    <S.Wrapper>
      <img
        src="../../img/gyulobal2.png"
        alt="Login logo"
        style={{ width: "45%", height: "45%" }}
      />
      <S.InputWrapper>
        <S.Label>사원번호</S.Label>
        <S.Input
          type="text"
          {...props.register("userId", { required: true })}
          placeholder="사원번호를 입력해주세요."
        />
        {props.errors.userId && <S.Error>사원번호를 입력해주세요.</S.Error>}
      </S.InputWrapper>
      <S.InputWrapper>
        <S.Label>비밀번호</S.Label>
        <S.Input
          type="password"
          {...props.register("password", { required: true })}
          placeholder="비밀번호를 입력해주세요."
        />
        {props.errors.password && <S.Error>비밀번호를 입력해주세요.</S.Error>}
      </S.InputWrapper>
      <S.ButtonWrapper>
        <S.CancelButton onClick={props.onClickJoin}>회원가입</S.CancelButton>
        <S.SubmitButton
          isActive={props.isValid}
          type="submit"
          onClick={props.handleSubmit(props.onSubmitBoard, props.onError)}
        >
          로그인
        </S.SubmitButton>
      </S.ButtonWrapper>
    </S.Wrapper>
  );
}
