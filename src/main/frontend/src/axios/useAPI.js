import { useContext } from "react";
import axios from "axios";
import { TokenContext } from "./TokenContext";
import { useRouter } from "next/router";
//import { useNavigate } from "react-router-dom";

export const useAPI = () => {
  const baseURL = "http://localhost:8080/api";
  const { state, dispatch } = useContext(TokenContext);
  const router = useRouter();

  const api = axios.create({
    baseURL: baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  //http요청시 accessToken 자동으로 추가
  api.interceptors.request.use(
    (config) => {
      if (state.accessToken) {
        console.log(state.accessToken);
        config.headers.Authorization = state.accessToken;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  //401 error : accessToken 기간만료시 (401) 다시 재발급 요청.
  //203 error : 토큰이 없음 => 로그인 하지 않음 login page로 리다이렉트
  api.interceptors.response.use(
    (response) => {
      if (response && response.status === 203) {
        // 203 에러 발생 시 로그인 페이지로 리다이렉트
        console.error("Unauthorized, redirecting to login...");
        router.push("/login");
        //window.location.href = "/login";
        return Promise.resolve(null); // 리다이렉트 후 더 이상 응답을 처리하지 않음
      }
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      if (
        error.response &&
        error.response.status === 401 &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;
        const refreshToken = state.refreshToken;

        if (!refreshToken) {
          // 리프레시 토큰이 없으면 로그인 페이지로 리다이렉트
          console.error(
            "리프레시 토큰이 없습니다. 로그인 페이지로 이동합니다."
          );
          router.push("/login");
          return Promise.reject(error);
        }
        try {
          // RefreshToken으로 새 AccessToken 발급 요청
          const response = await axios.post(
            "http://localhost:8080/auth/reissue-access-token",
            {
              refreshToken,
            }
          );
          const newAccessToken = response.data.accessToken;
          console.log("newAccessToken : " + newAccessToken);
          // 새 AccessToken을 Context와 세션 스토리지에 저장
          dispatch({
            type: "SET_TOKENS",
            payload: {
              accessToken: newAccessToken,
              refreshToken: state.refreshToken,
            },
          });

          originalRequest.headers.Authorization = newAccessToken;
          return api(originalRequest);
        } catch (error) {
          console.error("Access Token 재발급 실패:", refreshError);
          // 재발급 실패 시 로그인 페이지로 이동
          router.push("/login");
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );
  // GET 요청
  const get = async (url, params) => {
    try {
      const response = await api.get(url, { params });
      return response;
    } catch (error) {
      throw error;
    }
  };

  // POST 요청
  const post = async (url, data) => {
    try {
      const response = await api.post(url, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  // PUT 요청
  const put = async (url, data) => {
    try {
      const response = await api.put(url, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  // DELETE 요청
  const remove = async (url) => {
    try {
      const response = await api.delete(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return { get, post, put, remove };
};
