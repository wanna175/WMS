package lcw.lcw2_back.controller;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import lcw.lcw2_back.auth.JwtTokenProvider;
import lcw.lcw2_back.domain.notification.NotificationType;
import lcw.lcw2_back.dto.auth.LoginJwtResponse;
import lcw.lcw2_back.dto.auth.LoginRequest;
import lcw.lcw2_back.dto.auth.SignInRequest;
import lcw.lcw2_back.dto.user.UserDTO;
import lcw.lcw2_back.exception.auth.UserIdNotFoundException;
import lcw.lcw2_back.exception.auth.UserPasswordNotCorrectException;
import lcw.lcw2_back.exception.auth.UserStatusNotPermissionException;
import lcw.lcw2_back.service.auth.AuthService;
import lcw.lcw2_back.service.notification.NotificationService;
import lcw.lcw2_back.service.user.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@AllArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final UserService userService;
    private final JwtTokenProvider jwtTokenProvider;

    @PostMapping("/login")
    public ResponseEntity<Map<String,String>> login(@RequestBody LoginRequest loginRequest) {
        LoginJwtResponse token;
        Map<String, String> jwt = new HashMap<>();
        try {
            token = authService.login(loginRequest);
        } catch (UserIdNotFoundException|UserPasswordNotCorrectException e) {
            jwt.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(jwt);
        } catch (UserStatusNotPermissionException e) {
            jwt.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(jwt);
        }

        jwt.put(JwtTokenProvider.ACCESS_HEADER_STRING, token.getAccessToken());
        jwt.put(JwtTokenProvider.REFRESH_HEADER_STRING, token.getRefreshToken());
        return ResponseEntity.ok(jwt);

    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(@RequestHeader(value=JwtTokenProvider.ACCESS_HEADER_STRING, required=false) String accessToken) {

        if(accessToken == null) {
            throw new IllegalStateException();
        }

        String actualToken = accessToken.replaceFirst(JwtTokenProvider.ACCESS_PREFIX_STRING, ""); // Bear                                                er 제거
        String userId = jwtTokenProvider.getUserId(actualToken);

        authService.logout(userId); // refresh, access token을 DB에서 지워주기
        return ResponseEntity.ok("로그아웃에 성공하였습니다.");
    }
    @PostMapping("/join")
    public ResponseEntity<String> join(@RequestBody SignInRequest signInRequest) {
        //userService에서 회원정보 저장하기 구현해야함.
        // signInRequest를 디비에 저장하면 되것다.
        //notificationService.send("admin", NotificationType.MEMBER,"새 회원승인 요청");
        return userService.insertNewUser(new UserDTO(signInRequest))
                ? ResponseEntity.ok("성공 : 회원가입 요청")
                : ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("실패 : 회원가입 요청");


    }
    @PostMapping("/reissue-access-token")
    public ResponseEntity<?> reissueAccessToken(@RequestHeader(value=JwtTokenProvider.REFRESH_HEADER_STRING, required=false) String refreshToken) {

        if(refreshToken == null) { // 메인페이지로
            return ResponseEntity.status(HttpStatus.NON_AUTHORITATIVE_INFORMATION).body("not include token");
        }
        LoginJwtResponse token;
        String userId = jwtTokenProvider.getUserId(refreshToken);
        try {
            token = authService.reissueAccessToken(refreshToken);

        } catch (Exception e) {
            System.out.println("reissue token exception : 재발급 할 수 없습니다.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("유효하지 않은 토큰입니다.");
        }

        Map<String,String> jwt = new HashMap<>();
        jwt.put(JwtTokenProvider.ACCESS_HEADER_STRING, token.getAccessToken());
        jwt.put(JwtTokenProvider.REFRESH_HEADER_STRING, token.getRefreshToken());
        return ResponseEntity.ok(jwt);
    }
}
