import React, { createContext, useReducer } from "react";

//토큰 초기상태
const initialState = {
  accessToken: null,
  refreshToken: null,
};

// 서버가 아닌 브라우저에서만 sessionStorage를 사용하도록 안전하게 처리
if (typeof window !== "undefined") {
  initialState.accessToken = sessionStorage.getItem("accessToken");
  initialState.refreshToken = sessionStorage.getItem("refreshToken");
}
//토큰들을 전역변수로 관리.
const TokenContext = createContext(initialState);

//토큰 상태 관리 다른것은 ...state로 그대로 두고 토큰값만 변경
const tokenReducer = (state, action) => {
  switch (action.type) {
    case "SET_TOKENS":
      console.log("action" + action);
      if (typeof window !== "undefined") {
        sessionStorage.setItem("accessToken", action.payload.accessToken);
        sessionStorage.setItem("refreshToken", action.payload.refreshToken);
      }
      return {
        ...state,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };
    case "CLEAR_TOKENS":
      if (typeof window !== "undefined") {
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("refreshToken");
      }
      return {
        ...state,
        accessToken: null,
        refreshToken: null,
      };
    default:
      return state;
  }
};

const TokenProvider = ({ children }) => {
  const [state, dispatch] = useReducer(tokenReducer, initialState);

  return (
    <TokenContext.Provider value={{ state, dispatch }}>
      {children}
    </TokenContext.Provider>
  );
};

export { TokenContext, TokenProvider };
