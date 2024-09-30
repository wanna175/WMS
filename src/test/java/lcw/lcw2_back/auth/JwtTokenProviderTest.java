package lcw.lcw2_back.auth;

import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lcw.lcw2_back.domain.userTest.Role;
import lcw.lcw2_back.dto.auth.LoginJwtResponse;
import lcw.lcw2_back.dto.auth.LoginRequest;
import lcw.lcw2_back.dto.auth.SignInRequest;
import lcw.lcw2_back.exception.auth.UserIdNotFoundException;
import lcw.lcw2_back.exception.auth.UserPasswordNotCorrectException;
import lcw.lcw2_back.global.Utils.PasswordEncoder;
import lcw.lcw2_back.repository.auth.MemoryAccessTokenRepository;
import lcw.lcw2_back.repository.auth.MemoryRefreshTokenRepository;
import lcw.lcw2_back.repository.userTest.MemoryUserRepository;
import lcw.lcw2_back.service.auth.AuthService;
import lcw.lcw2_back.service.auth.AuthServiceImpl;
import lcw.lcw2_back.service.notification.NotificationServiceImpl;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import javax.crypto.SecretKey;

import java.time.LocalDate;
import java.util.Date;
import java.util.concurrent.atomic.AtomicReference;

class JwtTokenProviderTest {


    private JwtTokenProvider jwtTokenProvider;
    private AuthService authService;

    @BeforeEach
    void beforeEach(){
        jwtTokenProvider = new JwtTokenProvider(Keys.secretKeyFor(SignatureAlgorithm.HS256).toString(),"ko",
                new MemoryAccessTokenRepository(),new MemoryRefreshTokenRepository());
        authService = new AuthServiceImpl(new MemoryUserRepository(),jwtTokenProvider,new PasswordEncoder("salt"));
    }
    @Test
    @DisplayName("secretKey")
    void test(){
        SecretKey secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);
        System.out.println(secretKey.getEncoded());
        // 생성된 키를 Base64 형식으로 인코딩하여 출력
        String encodedKey = java.util.Base64.getEncoder().encodeToString(secretKey.getEncoded());
        System.out.println("Generated Key: " + encodedKey);
    }

    @Test
    @DisplayName("로그인 토큰 생성후 아이디,직책이 잘 들어가는지 비교")
    void createLoginToken() {
        //given
        String userId = "qwe541";
        Role role = Role.MANAGER;
        LoginJwtResponse ret;
        //when
        ret = jwtTokenProvider.createLoginToken(userId,role);
        //then
        System.out.println(ret.getAccessToken().getBytes());
        System.out.println(ret.getAccessToken());
        System.out.println(ret.getRefreshToken());
        String result = jwtTokenProvider.getUserId(ret.getAccessToken().substring(7));
        String roleRet = jwtTokenProvider.getRole(ret.getAccessToken().substring(7));
        System.out.println(roleRet);
        System.out.println(result);
        Assertions.assertThat(userId).isEqualTo(result);
    }   //Eunm을 string으로 변환하는 방법을 찾아야 겠다.

    @Test
    @DisplayName("로그인테스트")
    void login() {
        //given
        String userId = "qwe541";
        Role role = Role.MANAGER;
        authService.signIn(new SignInRequest(userId,null,"1234","고안나",
                LocalDate.now(),"jh5045@naver.com","01022222"));


        //when,then
        //AtomicReference<LoginJwtResponse> ret = new AtomicReference<>();
        //회원승인되는것 주석처리하고 테스트해야댐.
        //org.junit.jupiter.api.Assertions.assertDoesNotThrow(()->{
        //    ret.set(authService.login(new LoginRequest("qwe541", "1234")));});

//        System.out.println(ret.get().getAccessToken());
  //      System.out.println(ret.get().getRefreshToken());
    }

    @Test
    void getUserId() {
        //given
        //when
        //then
    }

    @Test
    void getRole() {
        //given
        //when
        //then
    }

    @Test
    void deleteTokenByUserId() {
        //given
        //when
        //then
    }

    @Test
    void resolveToken() {
        //given
        //when
        //then
    }
}